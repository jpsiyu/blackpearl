# Ethereum是什么

Ethereum俗称“全球计算机“。从计算机科学的角度来看，它本质上是一台状态机，拥有无限种状态，每一次的状态变化只能由一个特定的对象完成，这个对象运行在虚拟机当中，这就是它最基本的构成。从实用性的角度来看，它是全球化，分散化的基础运算设施，运行其上的程序被称作Smart Contract。Smart Contract运行状态的更新，同步，由底层的Blockchain实现。执行这些操作会消耗一定的计算资源，因此需要为此支付一笔小费，用加密货币ether作为支付媒介。Ethereum的运行生态具有高可用性，高可认证性，高透明度，中立性等等优点，同时可抵抗审查，降低交易对手不确定性风险,使得开发者得以构建强大的去中心化的应用.

# 与Bitcoin做对比

许多人接触Ethereum之前，已有加密货币的使用经验，特别是Bitcoin。Ethereum与其它开放型Blockchain有很多相似之处：通过点对点的网络进行连接；使用拜占庭容错的共识算法对内部状态进行同步更新；广泛运用密码学基本元素，如电子签名，哈希函数，加密货币等。但在其它很多方面，包括最终目标和实现架构，有惊人的差异。

Bitcoin是一个电子加密货币系统，它的脚本语言的功能非常有限，只能做简单的true/false条件判断。Ethereum的主要目标并非是电子支付网络。虽然电子货币ether自身是一个运行整体，也是Ethereum运行的必要因素。但从设计上，它是为了Ethereum这台“全球计算机“的运行而生，仅仅是一个货币工具而已。Ethereum的目标，是成为具有普遍性的，可编程的Blockchain。用户在它的虚拟机运行应用程序，执行数学运算和复杂的商业逻辑。Ethereum的脚本语言是图灵完整的，Ethereum从功能上是一台具有普遍适用性的计算机。

# Blockchain的组成

一个开放的，公共的Blockchain通常具有以下组件:

- 点对点的网络(P2P)，连接各个参与者，在其中广播交易消息和验证数据
- 消息，类似交易数据的格式，是最后形成状态的中间过渡数据
- 共识规则，规定交易的组成元素，判定交易的合法性
- 状态机，在共识规则下执行各种交易
- Block，多个交易数据组合成的，经过加密的块数据，形成数据链，记录了所有的经过验证且被接受的交易信息
- 共识算法，强制所有参与者遵守共识规则，从而达到分散化
- 运用博弈论的激励机制，给予参与验证的主体一定的奖励，防止Blockchain被私人篡改
- 实现上述功能的客户端软件

# Ethereum: 通用型Blockchain
最原始的Blockchain是Bitcoin Blockchain，它追踪Bitcoin的所有权和状态变化。Bitcoin本质上是一个分布式的具有共识的状态机，每一个交易都导致了状态的切换，最终导致的是货币所有权的转移。每次状态的切换，必须在共识规则约束下完成，同时所有的参与者都会进入下一个相同的状态下。Ethereum也是一个分布式的状态机，不同于Bitcoin追踪货币在某一状态下的所有权，Ethereum追踪的数据具有一般普遍性，包括所有可以用键值对表示的数据。换句话说，跟普通计算机使用的RAM数据存储模型是一样的。Ethereum存储着数据和代码，使用Blockchain来跟踪这些存储的变化，能够将代码加载进虚拟机中运行，并将产生的结果写入Blockchain之中。Ethereum跟普通计算机有两个关键性的区别，其一，Ethereum的运行必须遵循共识规则；其二，Ethereum的状态是全球化分布式的。Ethereum解决的是这样的问题：如果我们能够在特定的共识下，追踪程序的任意状态，并且对状态机进行编程，创造一个全球化的计算机系统，会发生什么呢？

# Ethereum的组成
Ethereum Blockchain的组件，具体来说，包括以下部分：

### P2P网络
> Ethereum的主网的协议叫做DEVp2p，运行在TCP之上，端口为30303
### 共识规则
> Ethereum的共识规则定义在其黄页的参考规格中
### 交易
> Ethereum的交易用网络消息实现，包含发送者，接受者，价值，数据负载等
### 状态机
> Ethereum的状态切换由Ethereum虚拟机(EVM)处理，EVM基于堆栈的架构，执行字节码。EVM运行的程序叫做"Smart Contract"，由高级语言，比如Solidity编写而成，经过编译，成为字节码，再由EVM执行
### 数据结构
> Ethereum的状态，存储在每个节点本地的数据库之中，通常是Google LevelDB，存储的数据包括交易数据和系统状态，经过哈希函数序列化，形成Merkle Particia Tree。
### 共识算法
> Ethereum使用Bitcoin的Nakamoto共识模型，用PoW算法，对按顺序排列的，单独签名的信息块加权重，决定出最长的区块链，为当前的合法状态。然而，Ethereum正计划用PoS加权投票系统来代替它.
### 经济安全性
> Ethereum目前使用名为Ethash的PoW算法保证自身的安全，但在不久的将来会用PoS算法取替
### 客户端
> Ethereum有多个使用不同语言开发的客户端程序，最流行的是Geth和Parity
