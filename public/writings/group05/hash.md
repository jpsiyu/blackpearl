# 哈希函数与Merkle Tree
密码学是隐藏数据的艺术和科学，更多的是艺术。科学在其中的地位，
仅仅是将妙想转变为数学公式的工具。

# 哈希函数
用一幅图来说明哈希函数的作用：

![img](/book/hash.jpg)

哈希函数，接收一个输入，通常是很大的数据，像电影，歌曲，电子书，图片或其它电子数据，输出一个固定字节的结果，并且大小远远小于输入。然而，仅仅改变输入的一个字节，输出的结果会截然不同。这是哈希函数最重要的特性之一。另一个重要的特性是，给出函数的结果，几乎不可能找到它的输入。

如果对哈希函数的结果，再进行一次哈希函数操作，得到的是另外一个全然不同的结果，这样子，原本的结果也无法认出来了。

# Merkle Tree
Merkle首先是树的数据结构，树的每个节点是它的字节点的组合哈希结果。一般来说，都是2叉树，每一个节点是它的两个孩子节点组合起来的哈希结果。最终会形成树的根，成为Merkle Root。如图所示：

![img](/book/merkle.jpg)

进一步对上图进行阐述，假设现在有两个值，2ad5, 3ce9, 它们拼在一起，经过哈希函数处理，得到结果23a2。由于哈希函数是单向的，每次对2ad5和3ce9进行哈希处理，总是得到23a2，但是只有23a2的话，是不能够确定原来的输入是2ad5和3ce9的。对其它节点进行相同的处理，最后会得到根0123。如果得到根0123，是不可能得到原始的数据D0, D1, D2, D3的。

现在假设我是D2的拥有者，根据分布式系统的共识规则，同时知道root哈希是0123，现在请求该系统证明，D2是其中的一块数据。这时候，系统给我提供哈希结果：3ce9, 01e3, 0123，证明如下：

- 对D2进行哈希操作，得到2ad5
- 对[2ad5 + 3ce9]进行哈希操作，得到23a2
- 对[01e3 + 23a2]进行哈希操作，得到0123

由于我们知道根是0123，通过上述证明，也能推导根是0123，因此，D2是该系统记录的一部分。如果D2不是该系统的一部分，系统不能提供相对应的哈希值用于证明。另外，证明过程也是很便捷的，需要的信息也非常少。这就是Merkle Tree的优势。
