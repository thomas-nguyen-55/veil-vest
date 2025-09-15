import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config as appConfig } from './config';

export const config = getDefaultConfig({
  appName: 'Veil Vest',
  projectId: appConfig.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});

export const chains = [sepolia];
