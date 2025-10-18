// components/ChainSelector.tsx - 区块链选择器组件
import { ConnectButton } from '@rainbow-me/rainbowkit'; // 对于EVM链
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'; // 对于Solana链

interface ChainSelectorProps {
  selectedChain: 'evm' | 'solana' | null;
  onSelectChain: (chain: 'evm' | 'solana' | null) => void;
  onBack: () => void;
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({
                                                              selectedChain,
                                                              onSelectChain,
                                                              onBack
                                                            }) => {
  // 未选择任何链时，显示选择按钮
  if (!selectedChain) {
    return (
      <div className="flex justify-center space-x-4 p-4">
        <button
          onClick={() => onSelectChain('evm')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
        >
          连接 EVM 钱包 (以太坊/Polygon)
        </button>
        <button
          onClick={() => onSelectChain('solana')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition"
        >
          连接 Solana 钱包
        </button>
      </div>
    );
  }

  // 已选择某条链后，显示对应的钱包连接按钮和返回选项
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition"
        >
          &larr; 返回链选择
        </button>
        <span className="text-lg">
          当前网络: {selectedChain === 'evm' ? 'EVM 链' : 'Solana'}
        </span>
      </div>

      <div>
        {selectedChain === 'evm' ? (
          <ConnectButton showBalance={false} />
        ) : (
          <div/>
          // <WalletMultiButton style={{ backgroundColor: '#9945FF' }} />
        )}
      </div>
    </div>
  );
};