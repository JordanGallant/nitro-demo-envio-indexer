/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  NitroAllocation,
  NitroAllocation_OwnershipTransferred,
  NitroFactory,
  NitroFactory_NitroPairCreated,
  NitroFactory_FeeRecipientSet,
  NitroFactory_DebtInteractionsAddressChange,
  NitroFactory_NitroPairIgnoredStateChanged,
  NitroFactory_NitroPairImplementationSet,
  NitroFactory_OwnershipTransferred,
  NitroFactory_PresetRemoved,
  NitroFactory_PresetSet,
  NitroFactory_QuoteAssetRemoved,
  NitroFactory_QuoteAssetAdded,
  NitroPair,
  NitroPair_WithdrawnFromBin,
  NitroPair_TransferSingle,
  NitroPair_TransferBatch,
  NitroPair_ProtocolFeesCollected,
  NitroPair_DepositedToBin,
  NitroPair_BlackListed,
  NitroPair_ApprovalForAll,
  NitroPair_Swap,
  NitroPair_RollOver,
  NitroPair_Repay,
  NitroPair_Borrow,
  NitroDebtManager,
  NitroDebtManager_Approval,
  NitroDebtManager_ApprovalForAll,
  NitroDebtManager_OwnershipTransferred,
  NitroDebtManager_Paused,
  NitroDebtManager_Unpaused,
  NitroDebtManager_Transfer,
  NitroPoint_CommunityRewarderLogicChanged,
  NitroPoint,
  NitroPoint_ApprovalForPair,
  NitroPoint_Approval,
  NitroPoint_NitroPointClaim
  

} from "generated";


const createOrUpdateGlobalStats = async (fields: any, context: any) => {
  let globalStats = await context.GlobalStats.get("global");

  if (globalStats) {
    // Update only the fields that exist in the event object
    for (const key in fields) {
      if (fields[key] !== undefined && key in globalStats) {
        globalStats[key] = fields[key];
      }
    }
  } else {
    globalStats = {
      id: "global",
      nitroPointOwner: "deployer",
      nitroPointOracle: "oracle",
      nitroFactoryOwner: "deployer",
      nitroAllocationOwner: "deployer",
      nitroDebtManagerOwner: "deployer",
    };
  }

  await context.GlobalStats.set(globalStats);

};

const createUser = async (address: string, context: any) => {
  let user = await context.User.get(address)

  if (!user) {
     user = {
       id: address,
       address: address,      
     }
     context.User.set(user);
  } 
} 


 NitroFactory.NitroPairCreated.contractRegister(
   async ({ event, context }) => {
     context.addNitroPair(event.params.NitroPair);
   },
   { preRegisterDynamicContracts: true }
 );

NitroFactory.NitroPairCreated.handler(async ({ event, context }) => {
  const entity: NitroFactory_NitroPairCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    tokenX: event.params.tokenX,
    tokenY: event.params.tokenY,
    binStep: event.params.binStep,
    nitroPair: event.params.NitroPair,
    pid: event.params.pid
   
  };

  context.NitroFactory_NitroPairCreated.set(entity);
});

// FACTORY
NitroFactory.DebtInteractionsAddressChange.handler(async ({ event, context }) => {
  const entity: NitroFactory_DebtInteractionsAddressChange = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    debtInteractionImplementation: event.params.debtInteractionImplemantetion,
    debtManager: event.params.debtmanager,
  };

  context.NitroFactory_DebtInteractionsAddressChange.set(entity);
});


NitroFactory.FeeRecipientSet.handler(async ({ event, context }) => {
  const entity: NitroFactory_FeeRecipientSet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldRecipient: event.params.oldRecipient,
    newRecipient: event.params.newRecipient,
  };

  context.NitroFactory_FeeRecipientSet.set(entity);
});


NitroFactory.NitroPairIgnoredStateChanged.handler(async ({ event, context }) => {
  const entity: NitroFactory_NitroPairIgnoredStateChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    nitroPair: event.params.NitroPair,
    ignored: event.params.ignored,
  };

  context.NitroFactory_NitroPairIgnoredStateChanged.set(entity);
});

NitroFactory.NitroPairImplementationSet.handler(async ({ event, context }) => {
  const entity: NitroFactory_NitroPairImplementationSet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldNitroPairImplementation: event.params.oldNitroPairImplementation,
    nitroPairImplementation: event.params.NitroPairImplementation,
  };

  context.NitroFactory_NitroPairImplementationSet.set(entity);
});

NitroFactory.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: NitroFactory_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.NitroFactory_OwnershipTransferred.set(entity);

  await createOrUpdateGlobalStats({ nitroFactoryOwner: event.params.newOwner }, context);
});

NitroFactory.PresetRemoved.handler(async ({ event, context }) => {
  const entity: NitroFactory_PresetRemoved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    binStep: event.params.binStep,
  };

  context.NitroFactory_PresetRemoved.set(entity);
});

NitroFactory.PresetSet.handler(async ({ event, context }) => {
  const entity: NitroFactory_PresetSet = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    binStep: event.params.binStep,
    baseFactor: event.params.baseFactor,
    borrowFactor: event.params.borrowFactor,
    protocolShare: event.params.protocolShare,
  };

  context.NitroFactory_PresetSet.set(entity);
});

NitroFactory.QuoteAssetAdded.handler(async ({ event, context }) => {
  const entity: NitroFactory_QuoteAssetAdded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    quoteAsset: event.params.quoteAsset,
  };

  context.NitroFactory_QuoteAssetAdded.set(entity);
});

NitroFactory.QuoteAssetRemoved.handler(async ({ event, context }) => {
  const entity: NitroFactory_QuoteAssetRemoved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    quoteAsset: event.params.quoteAsset,
  };

  context.NitroFactory_QuoteAssetRemoved.set(entity);
});


//NITROALLOCATION
NitroAllocation.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: NitroAllocation_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
   
  };

  context.NitroAllocation_OwnershipTransferred.set(entity);

  await createOrUpdateGlobalStats({ nitroAllocationOwner: event.params.newOwner }, context);
});

NitroAllocation.WhiteListed.handler(async ({ event, context }) => {
  await createUser(event.params.user, context);
});

// NITROPAIR

NitroPair.ApprovalForAll.handler(async ({ event, context }) => {
  const entity: NitroPair_ApprovalForAll = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    operator: event.params.operator,
    isApproved: event.params.isApproved,
  };

  context.NitroPair_ApprovalForAll.set(entity);
});

NitroPair.BlackListed.handler(async ({ event, context }) => {
  const entity: NitroPair_BlackListed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    tokenId: event.params.tokenId,
    pair: event.params.pair,
    ids: event.params.id,
    collateralAmounts: event.params.CollateralAmount,
  };

  context.NitroPair_BlackListed.set(entity);
});

NitroPair.DepositedToBin.handler(async ({ event, context }) => {
  const entity: NitroPair_DepositedToBin = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pair: event.params.pair,
    sender: event.params.sender,
    recipient: event.params.recipient,
    ids: event.params.id,
    amountX: event.params.amountX,
    amountY: event.params.amountY,
  };

  context.NitroPair_DepositedToBin.set(entity);
});

NitroPair.ProtocolFeesCollected.handler(async ({ event, context }) => {
  const entity: NitroPair_ProtocolFeesCollected = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: event.params.sender,
    recipient: event.params.recipient,
    amountX: event.params.amountX,
    amountY: event.params.amountY,
  };

  context.NitroPair_ProtocolFeesCollected.set(entity);
});

NitroPair.TransferBatch.handler(async ({ event, context }) => {
  const entity: NitroPair_TransferBatch = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    operator: event.params.operator,
    from: event.params.from,
    to: event.params.to,
    ids: event.params.ids,
    amounts: event.params.amounts,
  };

  context.NitroPair_TransferBatch.set(entity);
});

NitroPair.TransferSingle.handler(async ({ event, context }) => {
  const entity: NitroPair_TransferSingle = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    operator: event.params.operator,
    from: event.params.from,
    to: event.params.to,
    id_: event.params.id,
    amount: event.params.amount,
  };

  context.NitroPair_TransferSingle.set(entity);
});

NitroPair.WithdrawnFromBin.handler(async ({ event, context }) => {
  const entity: NitroPair_WithdrawnFromBin = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pair: event.params.pair,
    sender: event.params.sender,
    recipient: event.params.recipient,
    ids: event.params.id,
    amountX: event.params.amountX,
    amountY: event.params.amountY,
  };

  context.NitroPair_WithdrawnFromBin.set(entity);
});

NitroPair.Borrow.handler(async ({ event, context }) => {
  const entity: NitroPair_Borrow = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    recipient: event.params.recipient,
    tokenId: event.params.tokenId,
    pair: event.params.pair,
    isXtoY: event.params._isXtoY,
    ids: event.params.id,
    amountIn: event.params.amountIn,
    amountOut: event.params.amountOut,
    fees: event.params.fees,
  };

  context.NitroPair_Borrow.set(entity);
});

NitroPair.Repay.handler(async ({ event, context }) => {
  const entity: NitroPair_Repay = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    recipient: event.params.recipient,
    tokenId: event.params.tokenId,
    pair: event.params.pair,
    isXtoY: event.params._isXtoY,
    ids: event.params.id,
    amountIn: event.params.amountIn,
    amountOut: event.params.amountOut,
    fees: event.params.fees,
  };

  context.NitroPair_Repay.set(entity);
});

NitroPair.RollOver.handler(async ({ event, context }) => {
  const entity: NitroPair_RollOver = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    isXtoY: event.params._isXtoY,
    tokenId: event.params.tokenId,
    ids: event.params.id,
    amountIn: event.params.amountIn,
  };

  context.NitroPair_RollOver.set(entity);
});

NitroPair.Swap.handler(async ({ event, context }) => {
  const entity: NitroPair_Swap = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: event.params.sender,
    recipient: event.params.recipient,
    id_: event.params.id,
    isXtoY: event.params._isXtoY,
    amountIn: event.params.amountIn,
    amountOut: event.params.amountOut,
    fees: event.params.fees,
  };

  context.NitroPair_Swap.set(entity);
});


//NITRODEBTMANAGER


NitroDebtManager.Approval.handler(async ({ event, context }) => {
  const entity: NitroDebtManager_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    account: event.params.account,
    tokenId: event.params.id,
  };

  context.NitroDebtManager_Approval.set(entity);
});

NitroDebtManager.ApprovalForAll.handler(async ({ event, context }) => {
  const entity: NitroDebtManager_ApprovalForAll = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    operator: event.params.operator,
    isApproved: event.params.isApproved,
  };

  context.NitroDebtManager_ApprovalForAll.set(entity);
});

NitroDebtManager.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: NitroDebtManager_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.NitroDebtManager_OwnershipTransferred.set(entity);

  await createOrUpdateGlobalStats({ nitroDebtManagerOwner: event.params.newOwner }, context);
});

NitroDebtManager.Paused.handler(async ({ event, context }) => {
  const entity: NitroDebtManager_Paused = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    account: event.params.account,
  };

  context.NitroDebtManager_Paused.set(entity);
});

NitroDebtManager.Transfer.handler(async ({ event, context }) => {
  const entity: NitroDebtManager_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.id,
  };

  context.NitroDebtManager_Transfer.set(entity);
});

NitroDebtManager.Unpaused.handler(async ({ event, context }) => {
  const entity: NitroDebtManager_Unpaused = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    account: event.params.account,
  };

  context.NitroDebtManager_Unpaused.set(entity);
});

//NITROPOINTS

NitroPoint.Approval.handler(async ({ event, context }) => {
  const entity: NitroPoint_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    spender: event.params.spender,
    status: event.params.status,
  };

  context.NitroPoint_Approval.set(entity);
});

NitroPoint.ApprovalForPair.handler(async ({ event, context }) => {
  const entity: NitroPoint_ApprovalForPair = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    spender: event.params.spender,
    amount: event.params.amount,
  };

  context.NitroPoint_ApprovalForPair.set(entity);
});

NitroPoint.CommunityRewarderLogicChanged.handler(async ({ event, context }) => {
  const entity: NitroPoint_CommunityRewarderLogicChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    rewarderLogic: event.params.rewarderLogic,
    status: event.params.status,
  };

  context.NitroPoint_CommunityRewarderLogicChanged.set(entity);
});


NitroPoint.NitroPointClaim.handler(async ({ event, context }) => {
  const entity: NitroPoint_NitroPointClaim = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    receiver: event.params.receiver,
    amount: event.params.amount,
  };

  context.NitroPoint_NitroPointClaim.set(entity);
});

NitroPoint.OracleChange.handler(async ({ event, context }) => {
  await createOrUpdateGlobalStats({ nitroPointOracle: event.params.oracle }, context);
});

