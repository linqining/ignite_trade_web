import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  Avatar,
  Grid,
  Card,
  CardContent,
  Icon,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  SwapHoriz as SwapIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import{Chain,ChainId,chainIdToChain,chainIds} from "@wormhole-foundation/sdk-base";
import { chainToIcon } from "@wormhole-foundation/sdk-icons";



export function PortalTokenBridge  ()  {
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('solana');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('SOL');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('1.0');
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const chains = []
  for (var chainID in chainIds){
    const chain = chainIdToChain(chainID);
    const token = chainToIcon(chain);
    if (chain){
      chains.push({ id: chainID, name: chain, icon: token })
    }
  }


  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: '1.234' },
    { symbol: 'SOL', name: 'Solana', icon: '◎', balance: '45.67' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💲', balance: '1000.00' },
    { symbol: 'USDT', name: 'Tether', icon: '💲', balance: '500.00' }
  ];

  const handleSwapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleBridge = () => {
    setIsSwapping(true);
    // 模拟桥接过程
    setTimeout(() => {
      setIsSwapping(false);
      // 这里可以添加成功处理逻辑
    }, 2000);
  };

  const estimatedTime = '~3 minutes';
  const estimatedFee = '0.0012 ETH';

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* 标题区域 */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Portal Token Bridge
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cross-chain token transfers made simple
          </Typography>
        </Box>

        {/* 链选择区域 */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel>From Chain</InputLabel>
              <Select
                value={fromChain}
                label="From Chain"
                onChange={(e) => setFromChain(e.target.value)}
              >
                {chains.map((chain) => (
                  <MenuItem key={chain.id} value={chain.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>
                        <img style={{width:20}} src={chain.icon}/>
                      </span>
                      {chain.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            <IconButton onClick={handleSwapChains} sx={{ color: 'primary.main' }}>
              <SwapIcon />
            </IconButton>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel>To Chain</InputLabel>
              <Select
                value={toChain}
                label="To Chain"
                onChange={(e) => setToChain(e.target.value)}
              >
                {chains.map((chain) => (
                  <MenuItem key={chain.id} value={chain.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>
                        <img style={{width:20}} src={chain.icon}/>
                      </span>
                      {chain.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 代币选择区域 */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>From Token</InputLabel>
              <Select
                value={fromToken}
                label="From Token"
                onChange={(e) => setFromToken(e.target.value)}
              >
                {tokens.map((token) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.8rem' }}>
                        {token.icon}
                      </Avatar>
                      {token.symbol}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5 }}>
              Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>To Token</InputLabel>
              <Select
                value={toToken}
                label="To Token"
                onChange={(e) => setToToken(e.target.value)}
              >
                {tokens.map((token) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.8rem' }}>
                        {token.icon}
                      </Avatar>
                      {token.symbol}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* 金额输入 */}
        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <Button
                size="small"
                onClick={() => setAmount(tokens.find(t => t.symbol === fromToken)?.balance || '')}
              >
                MAX
              </Button>
            )
          }}
        />

        {/* 高级设置 */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isAdvanced}
                onChange={(e) => setIsAdvanced(e.target.value)}
                color="primary"
              />
            }
            label="Advanced Settings"
          />

          {isAdvanced && (
            <TextField
              fullWidth
              label="Slippage Tolerance"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              placeholder="1.0"
              size="small"
              sx={{ mt: 1 }}
              InputProps={{
                endAdornment: <Typography variant="body2">%</Typography>
              }}
            />
          )}
        </Box>

        {/* 预估信息 */}
        <Card variant="outlined" sx={{ mb: 3, bgcolor: 'background.default' }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Estimated Time
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {estimatedTime}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Bridge Fee
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {estimatedFee}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 桥接按钮 */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleBridge}
          disabled={!amount || isSwapping}
          sx={{ mb: 2, py: 1.5 }}
        >
          {isSwapping ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Bridging...
            </>
          ) : (
            'Bridge Tokens'
          )}
        </Button>

        {/* 安全提示 */}
        <Alert severity="info" icon={<InfoIcon />}>
          <Typography variant="body2">
            Your tokens will be securely bridged using Portal's audited smart contracts.
          </Typography>
        </Alert>

        {/* 状态指示器 */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Chip
            icon={<CheckCircleIcon />}
            label="Secure Connection"
            color="success"
            variant="outlined"
            size="small"
          />
        </Box>
      </Paper>
    </Container>
  );
};

