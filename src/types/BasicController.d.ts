/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { BigNumber, BigNumberish, ethers, EventFilter, PopulatedTransaction, Signer } from "ethers";
import { CallOverrides, Contract, ContractTransaction, Overrides } from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";

interface BasicControllerInterface extends ethers.utils.Interface {
  functions: {
    "initialize(address)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "registerDomain(string,address)": FunctionFragment;
    "registerSubdomain(uint256,string,address)": FunctionFragment;
    "registerSubdomainExtended(uint256,string,address,string,uint256,bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerDomain",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerSubdomain",
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerSubdomainExtended",
    values: [BigNumberish, string, string, string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerSubdomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerSubdomainExtended",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "RegisteredDomain(string,uint256,uint256,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RegisteredDomain"): EventFragment;
}

export class BasicController extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: BasicControllerInterface;

  functions: {
    initialize(
      _registrar: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(address)"(
      _registrar: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    registerDomain(
      domain: string,
      owner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerDomain(string,address)"(
      domain: string,
      owner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    registerSubdomain(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerSubdomain(uint256,string,address)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    registerSubdomainExtended(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerSubdomainExtended(uint256,string,address,string,uint256,bool)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  initialize(
    _registrar: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(address)"(
    _registrar: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "onERC721Received(address,address,uint256,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  registerDomain(
    domain: string,
    owner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerDomain(string,address)"(
    domain: string,
    owner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  registerSubdomain(
    parentId: BigNumberish,
    label: string,
    owner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerSubdomain(uint256,string,address)"(
    parentId: BigNumberish,
    label: string,
    owner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  registerSubdomainExtended(
    parentId: BigNumberish,
    label: string,
    owner: string,
    metadata: string,
    royaltyAmount: BigNumberish,
    lockOnCreation: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerSubdomainExtended(uint256,string,address,string,uint256,bool)"(
    parentId: BigNumberish,
    label: string,
    owner: string,
    metadata: string,
    royaltyAmount: BigNumberish,
    lockOnCreation: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "supportsInterface(bytes4)"(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    initialize(_registrar: string, overrides?: CallOverrides): Promise<void>;

    "initialize(address)"(
      _registrar: string,
      overrides?: CallOverrides
    ): Promise<void>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    registerDomain(
      domain: string,
      owner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerDomain(string,address)"(
      domain: string,
      owner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    registerSubdomain(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerSubdomain(uint256,string,address)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    registerSubdomainExtended(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerSubdomainExtended(uint256,string,address,string,uint256,bool)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    RegisteredDomain(
      name: null,
      id: BigNumberish | null,
      parent: BigNumberish | null,
      owner: string | null,
      minter: null
    ): EventFilter;
  };

  estimateGas: {
    initialize(_registrar: string, overrides?: Overrides): Promise<BigNumber>;

    "initialize(address)"(
      _registrar: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    registerDomain(
      domain: string,
      owner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "registerDomain(string,address)"(
      domain: string,
      owner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    registerSubdomain(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "registerSubdomain(uint256,string,address)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    registerSubdomainExtended(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "registerSubdomainExtended(uint256,string,address,string,uint256,bool)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initialize(
      _registrar: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(address)"(
      _registrar: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    registerDomain(
      domain: string,
      owner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerDomain(string,address)"(
      domain: string,
      owner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    registerSubdomain(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerSubdomain(uint256,string,address)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    registerSubdomainExtended(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerSubdomainExtended(uint256,string,address,string,uint256,bool)"(
      parentId: BigNumberish,
      label: string,
      owner: string,
      metadata: string,
      royaltyAmount: BigNumberish,
      lockOnCreation: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
