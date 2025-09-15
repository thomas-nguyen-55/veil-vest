import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ADDRESSES, VEIL_VEST_ABI } from '@/lib/contracts';
import { sepolia } from 'wagmi/chains';

export function useVeilVest() {
  const { address, chainId } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const contractAddress = CONTRACT_ADDRESSES[sepolia.id]?.VeilVest;

  // Read contract functions
  const { data: globalStats } = useReadContract({
    address: contractAddress,
    abi: VEIL_VEST_ABI,
    functionName: 'getGlobalStats',
    chainId: sepolia.id,
  });

  const getUserVestings = (userAddress: string) => {
    return useReadContract({
      address: contractAddress,
      abi: VEIL_VEST_ABI,
      functionName: 'getUserVestings',
      args: [userAddress as `0x${string}`],
      chainId: sepolia.id,
    });
  };

  const getVestingInfo = (vestingId: bigint) => {
    return useReadContract({
      address: contractAddress,
      abi: VEIL_VEST_ABI,
      functionName: 'getVestingInfo',
      args: [vestingId],
      chainId: sepolia.id,
    });
  };

  const getUserReputation = (userAddress: string) => {
    return useReadContract({
      address: contractAddress,
      abi: VEIL_VEST_ABI,
      functionName: 'getUserReputation',
      args: [userAddress as `0x${string}`],
      chainId: sepolia.id,
    });
  };

  // Write contract functions
  const createVesting = async (
    name: string,
    description: string,
    totalAmount: string,
    vestingDuration: bigint,
    cliffDuration: bigint
  ) => {
    if (!contractAddress) throw new Error('Contract not deployed');
    
    const amountInWei = parseEther(totalAmount);
    
    return writeContract({
      address: contractAddress,
      abi: VEIL_VEST_ABI,
      functionName: 'createVesting',
      args: [name, description, amountInWei, vestingDuration, cliffDuration],
      value: amountInWei,
      chainId: sepolia.id,
    });
  };

  const claimTokens = async (vestingId: bigint, amount: string, inputProof: `0x${string}`) => {
    if (!contractAddress) throw new Error('Contract not deployed');
    
    return writeContract({
      address: contractAddress,
      abi: VEIL_VEST_ABI,
      functionName: 'claimTokens',
      args: [vestingId, amount, inputProof],
      chainId: sepolia.id,
    });
  };

  const pauseVesting = async (vestingId: bigint) => {
    if (!contractAddress) throw new Error('Contract not deployed');
    
    return writeContract({
      address: contractAddress,
      abi: VEIL_VEST_ABI,
      functionName: 'pauseVesting',
      args: [vestingId],
      chainId: sepolia.id,
    });
  };

  const resumeVesting = async (vestingId: bigint) => {
    if (!contractAddress) throw new Error('Contract not deployed');
    
    return writeContract({
      address: contractAddress,
      abi: VEIL_VEST_ABI,
      functionName: 'resumeVesting',
      args: [vestingId],
      chainId: sepolia.id,
    });
  };

  return {
    // Contract address
    contractAddress,
    
    // Read functions
    globalStats,
    getUserVestings,
    getVestingInfo,
    getUserReputation,
    
    // Write functions
    createVesting,
    claimTokens,
    pauseVesting,
    resumeVesting,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    
    // Account info
    address,
    chainId,
    isConnected: !!address,
  };
}
