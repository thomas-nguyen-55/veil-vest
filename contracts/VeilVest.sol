// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VeilVest is SepoliaConfig {
    using FHE for *;
    
    struct VestingSchedule {
        euint32 vestingId;
        euint32 totalAmount;
        euint32 claimedAmount;
        euint32 vestingDuration;
        euint32 cliffDuration;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address beneficiary;
        address creator;
        uint256 startTime;
        uint256 endTime;
        uint256 cliffEndTime;
    }
    
    struct ClaimRecord {
        euint32 claimId;
        euint32 amount;
        address beneficiary;
        uint256 timestamp;
    }
    
    struct VestingStats {
        euint32 totalVestings;
        euint32 activeVestings;
        euint32 totalClaimed;
        euint32 totalLocked;
    }
    
    mapping(uint256 => VestingSchedule) public vestingSchedules;
    mapping(uint256 => ClaimRecord) public claimRecords;
    mapping(address => euint32) public userReputation;
    mapping(address => uint256[]) public userVestings;
    
    VestingStats public globalStats;
    
    uint256 public vestingCounter;
    uint256 public claimCounter;
    
    address public owner;
    address public verifier;
    
    event VestingCreated(uint256 indexed vestingId, address indexed beneficiary, string name);
    event TokensClaimed(uint256 indexed claimId, uint256 indexed vestingId, address indexed beneficiary, uint32 amount);
    event VestingVerified(uint256 indexed vestingId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event VestingPaused(uint256 indexed vestingId);
    event VestingResumed(uint256 indexed vestingId);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        
        // Initialize global stats
        globalStats = VestingStats({
            totalVestings: FHE.asEuint32(0),
            activeVestings: FHE.asEuint32(0),
            totalClaimed: FHE.asEuint32(0),
            totalLocked: FHE.asEuint32(0)
        });
    }
    
    function createVesting(
        string memory _name,
        string memory _description,
        uint256 _totalAmount,
        uint256 _vestingDuration,
        uint256 _cliffDuration
    ) public payable returns (uint256) {
        require(bytes(_name).length > 0, "Vesting name cannot be empty");
        require(_totalAmount > 0, "Total amount must be positive");
        require(_vestingDuration > 0, "Vesting duration must be positive");
        require(_cliffDuration <= _vestingDuration, "Cliff duration cannot exceed vesting duration");
        require(msg.value >= _totalAmount, "Insufficient payment");
        
        uint256 vestingId = vestingCounter++;
        uint256 startTime = block.timestamp;
        uint256 cliffEndTime = startTime + _cliffDuration;
        uint256 endTime = startTime + _vestingDuration;
        
        vestingSchedules[vestingId] = VestingSchedule({
            vestingId: FHE.asEuint32(0), // Will be set properly later
            totalAmount: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            claimedAmount: FHE.asEuint32(0),
            vestingDuration: FHE.asEuint32(0), // Will be set to actual value
            cliffDuration: FHE.asEuint32(0), // Will be set to actual value
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            beneficiary: msg.sender,
            creator: msg.sender,
            startTime: startTime,
            endTime: endTime,
            cliffEndTime: cliffEndTime
        });
        
        // Add to user's vesting list
        userVestings[msg.sender].push(vestingId);
        
        // Update global stats
        globalStats.totalVestings = FHE.add(globalStats.totalVestings, FHE.asEuint32(1));
        globalStats.activeVestings = FHE.add(globalStats.activeVestings, FHE.asEuint32(1));
        globalStats.totalLocked = FHE.add(globalStats.totalLocked, FHE.asEuint32(0)); // Will be set to actual value
        
        emit VestingCreated(vestingId, msg.sender, _name);
        return vestingId;
    }
    
    function claimTokens(
        uint256 vestingId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(vestingSchedules[vestingId].beneficiary != address(0), "Vesting does not exist");
        require(vestingSchedules[vestingId].isActive, "Vesting is not active");
        require(vestingSchedules[vestingId].beneficiary == msg.sender, "Only beneficiary can claim");
        require(block.timestamp >= vestingSchedules[vestingId].cliffEndTime, "Cliff period not ended");
        
        uint256 claimId = claimCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Verify the claim amount is valid
        euint32 totalAmount = vestingSchedules[vestingId].totalAmount;
        euint32 claimedAmount = vestingSchedules[vestingId].claimedAmount;
        euint32 remainingAmount = FHE.sub(totalAmount, claimedAmount);
        
        // Check if claim amount is within remaining amount
        ebool isValidClaim = FHE.le(internalAmount, remainingAmount);
        require(FHE.decrypt(isValidClaim), "Claim amount exceeds remaining amount");
        
        claimRecords[claimId] = ClaimRecord({
            claimId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            beneficiary: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update vesting schedule
        vestingSchedules[vestingId].claimedAmount = FHE.add(vestingSchedules[vestingId].claimedAmount, internalAmount);
        
        // Update global stats
        globalStats.totalClaimed = FHE.add(globalStats.totalClaimed, internalAmount);
        globalStats.totalLocked = FHE.sub(globalStats.totalLocked, internalAmount);
        
        // Check if vesting is complete
        ebool isComplete = FHE.eq(vestingSchedules[vestingId].claimedAmount, vestingSchedules[vestingId].totalAmount);
        if (FHE.decrypt(isComplete)) {
            vestingSchedules[vestingId].isActive = false;
            globalStats.activeVestings = FHE.sub(globalStats.activeVestings, FHE.asEuint32(1));
        }
        
        // Transfer tokens to beneficiary
        payable(msg.sender).transfer(0); // Amount will be decrypted off-chain
        
        emit TokensClaimed(claimId, vestingId, msg.sender, 0); // Amount will be decrypted off-chain
        return claimId;
    }
    
    function verifyVesting(uint256 vestingId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify vestings");
        require(vestingSchedules[vestingId].beneficiary != address(0), "Vesting does not exist");
        
        vestingSchedules[vestingId].isVerified = isVerified;
        emit VestingVerified(vestingId, isVerified);
    }
    
    function pauseVesting(uint256 vestingId) public {
        require(vestingSchedules[vestingId].creator == msg.sender || msg.sender == owner, "Not authorized");
        require(vestingSchedules[vestingId].beneficiary != address(0), "Vesting does not exist");
        
        vestingSchedules[vestingId].isActive = false;
        globalStats.activeVestings = FHE.sub(globalStats.activeVestings, FHE.asEuint32(1));
        
        emit VestingPaused(vestingId);
    }
    
    function resumeVesting(uint256 vestingId) public {
        require(vestingSchedules[vestingId].creator == msg.sender || msg.sender == owner, "Not authorized");
        require(vestingSchedules[vestingId].beneficiary != address(0), "Vesting does not exist");
        
        vestingSchedules[vestingId].isActive = true;
        globalStats.activeVestings = FHE.add(globalStats.activeVestings, FHE.asEuint32(1));
        
        emit VestingResumed(vestingId);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getVestingInfo(uint256 vestingId) public view returns (
        string memory name,
        string memory description,
        uint8 totalAmount,
        uint8 claimedAmount,
        bool isActive,
        bool isVerified,
        address beneficiary,
        address creator,
        uint256 startTime,
        uint256 endTime,
        uint256 cliffEndTime
    ) {
        VestingSchedule storage vesting = vestingSchedules[vestingId];
        return (
            vesting.name,
            vesting.description,
            0, // FHE.decrypt(vesting.totalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(vesting.claimedAmount) - will be decrypted off-chain
            vesting.isActive,
            vesting.isVerified,
            vesting.beneficiary,
            vesting.creator,
            vesting.startTime,
            vesting.endTime,
            vesting.cliffEndTime
        );
    }
    
    function getClaimInfo(uint256 claimId) public view returns (
        uint8 amount,
        address beneficiary,
        uint256 timestamp
    ) {
        ClaimRecord storage claim = claimRecords[claimId];
        return (
            0, // FHE.decrypt(claim.amount) - will be decrypted off-chain
            claim.beneficiary,
            claim.timestamp
        );
    }
    
    function getUserVestings(address user) public view returns (uint256[] memory) {
        return userVestings[user];
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getGlobalStats() public view returns (
        uint8 totalVestings,
        uint8 activeVestings,
        uint8 totalClaimed,
        uint8 totalLocked
    ) {
        return (
            0, // FHE.decrypt(globalStats.totalVestings) - will be decrypted off-chain
            0, // FHE.decrypt(globalStats.activeVestings) - will be decrypted off-chain
            0, // FHE.decrypt(globalStats.totalClaimed) - will be decrypted off-chain
            0  // FHE.decrypt(globalStats.totalLocked) - will be decrypted off-chain
        );
    }
    
    function calculateVestedAmount(uint256 vestingId) public view returns (uint8) {
        VestingSchedule storage vesting = vestingSchedules[vestingId];
        
        if (block.timestamp < vesting.cliffEndTime) {
            return 0; // No tokens vested during cliff period
        }
        
        if (block.timestamp >= vesting.endTime) {
            return 0; // FHE.decrypt(vesting.totalAmount) - all tokens vested
        }
        
        // Calculate vested amount based on time elapsed
        uint256 timeElapsed = block.timestamp - vesting.cliffEndTime;
        uint256 vestingDuration = vesting.endTime - vesting.cliffEndTime;
        
        // This calculation will be done off-chain with FHE
        return 0; // FHE.decrypt(vesting.totalAmount * timeElapsed / vestingDuration)
    }
    
    // Emergency functions
    function emergencyWithdraw() public {
        require(msg.sender == owner, "Only owner can emergency withdraw");
        payable(owner).transfer(address(this).balance);
    }
    
    function setVerifier(address _verifier) public {
        require(msg.sender == owner, "Only owner can set verifier");
        verifier = _verifier;
    }
}
