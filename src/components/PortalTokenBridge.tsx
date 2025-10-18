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
  Chip,
  Avatar,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  // IconButton,
  // Tooltip
} from '@mui/material';
import {
  // SwapHoriz as SwapIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  // ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import{chainIdToChain,chainIds} from "@wormhole-foundation/sdk-base";
import { chainToIcon } from "@wormhole-foundation/sdk-icons";
import { ChainContext, wormhole } from "@wormhole-foundation/sdk";
import { Wormhole, amount, signSendWait } from "@wormhole-foundation/sdk";
import algorand from "@wormhole-foundation/sdk/algorand";
import aptos from "@wormhole-foundation/sdk/aptos";
import cosmwasm from "@wormhole-foundation/sdk/cosmwasm";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import sui from "@wormhole-foundation/sdk/sui";


export function PortalTokenBridge  ()  {
  const [fromChain, setFromChain] = useState('Solana');
  const [toChain, setToChain] = useState('solana');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('SOL');
  const [amount, setAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  let wh: Wormhole<'Testnet'>;
  wormhole("Testnet", [evm, solana, aptos, algorand, cosmwasm, sui]).
    then(response => { wh = response}).catch(error => {
      console.error("Error initializing Wormhole SDK:", error);
  })

  let srcChain:ChainContext<'Testnet'>
  const selectSourceChain=(e)=>{
      console.log(e.target.value);
      setFromChain(e.target.value);
      srcChain = wh.getChain(e.target.value);
      console.log(srcChain);
  }

  const chains = []
  for (var chainID in chainIds){
    const chain = chainIdToChain(chainID);
    const token = chainToIcon(chain);
    if (chain){
      chains.push({ id: chainID, name: chain, icon: token })
    }
  }



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
            Portal Token Register
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cross-chain token transfers made simple
          </Typography>
        </Box>

        {/* 链选择区域 */}
        <Grid fullWidth   spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid   spacing={2} sx={{ mb: 3 }} xs={6}>
            <FormControl fullWidth>
              <InputLabel>Source Chain</InputLabel>
              <Select
                value={fromChain}
                label="From Chain"
                onChange={(e) => selectSourceChain(e)}
              >
                {chains.map((chain) => (
                  <MenuItem key={chain.id} value={chain.name}>
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
        {/* 金额输入 */}
        <TextField
          fullWidth
          label="Token address"
          // type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder=""
          sx={{ mb: 3 }}
        />


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

