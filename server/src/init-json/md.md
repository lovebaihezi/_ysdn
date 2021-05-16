# 第4章 图像阈值与平滑实验2：全局阈值

## 1 项目目标

1. 理解二值化与阈值之间的区别与联系
2. 掌握图像阈值概念
3. 掌握使用OpenCV进行图像的阈值操作
4. 掌握阈值对图像处理的实际意义

## 2 项目描述

penCV是一个基于BSD许可（开源）发行的跨平台计算机视觉和机器学习软件库，可以运行在Linux、Windows、Android和Mac OS操作系统上。 [1]  它轻量级而且高效——由一系列 C 函数和少量 C++ 类构成，同时提供了Python、Ruby、MATLAB等语言的接口，实现了图像处理和计算机视觉方面的很多通用算法。

OpenCV是计算机视觉中经典的专用库，其支持多语言、跨平台，功能强大。 OpenCV-Python为OpenCV提供了Python接口，使得使用者在Python中能够调用C/C++，在保证易读性和运行效率的前提下，实现所需的功能。 


本项目通过OpenCV图像阈值操作的实训，通过学习数学知识掌握图像阈值操作的本质，并在实验实操中掌握OpenCV图像阈值操作的运用。

## 3 知识准备

### 3.1 图像阈值化

图像二值化就是将图像上的像素点的灰度值设置为0或255，也就是将整个图像呈现出明显的黑白效果的过程。二值化处理后的图像非黑即白，其实，二值化的过程中也有接触到阈值的概念，我们在处理图像的过程中，设置图像的阈值为127，超过图像阈值，就赋值255，低于图像阈值，就赋值0。

事实上，OpenCV在给出阈值操作时有了更多的选择，使得图像在经过阈值处理后不再是非黑即白的图像。

实验中不同阈值化方法产生的图像：

![aap59A.png](https://s1.ax1x.com/2020/08/03/aap59A.png)

### 3.2 全局阈值类型

为了解释阈值分割的过程，我们来看一个简单有关像素灰度的图片，该图如下。该图中的蓝色水平线代表着具体的一个阈值。

![1](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Base_Figure.png)

阈值类型1：二进制阈值化
该阈值化类型如下式所示:

![2](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/78fda905d5dd8210a01906247514a67d8763407c.png)

解释：在运用该阈值类型的时候，先要选定一个特定的阈值量，比如：125，这样，新的阈值产生规则可以解释为大于125的像素点的灰度值设定为最大值(如8位灰度值最大为255)，灰度值小于125的像素点的灰度值设定为0。

![3](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Binary.png)

阈值类型2：反二进制阈值化
该阈值类型如下式所示：

![4](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/86b664329c208ff89854226e992d9e9f3f6a0697.png)

解释：该阈值化与二进制阈值化相似，先选定一个特定的灰度值作为阈值，不过最后的设定值相反。（在8位灰度图中，例如大于阈值的设定为0，而小于该阈值的设定为255）。

![5](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Binary_Inverted.png)

阈值类型3：截断阈值化
该阈值化类型如下式所示：

![6](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/0f3cd4f2207fe9992e698c2699d7953453934874.png)

解释：同样首先需要选定一个阈值，图像中大于该阈值的像素点被设定为该阈值，小于该阈值的保持不变。（例如：阈值选取为125，那小于125的阈值不改变，大于125的灰度值（230）的像素点就设定为该阈值）。

![7](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Truncate.png)

阈值类型4：阈值化为0
该阈值类型如下式所示：

![8](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/71183c69df0d555b0498c6d42e846f438e47b179.png)

解释：先选定一个阈值，然后对图像做如下处理：1 像素点的灰度值大于该阈值的不进行任何改变；2 像素点的灰度值小于该阈值的，其灰度值全部变为0。

![9](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Zero.png)

阈值类型5：反阈值化为0
该阈值类型如下式所示：

![10](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/2c112979b15dafc432c64bd20405ae2b3e64f149.png)

解释：原理类似于0阈值，但是在对图像做处理的时候相反，即：像素点的灰度值小于该阈值的不进行任何改变，而大于该阈值的部分，其灰度值全部变为0。

![11](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Zero_Inverted.png)




## 4 项目实施

基于项目描述与知识准备的内容，我们对**图像二值化**有了一定的理解，现在我们回归**OpenCV操作**，通过**OpenCV图像二值化处理**等相关概念尝试着实现以下几项简单的实验

### 4.1 实施思路

我们将按照下述五个步骤来完成实验。

1. 导入实验所需库
2. 生成黑白渐变图
3. 渐变图的阈值处理
4. 自定义阈值处理

### 4.2 实施步骤

## 步骤1：导入实验所需库

本次实验需要额外安装的库：cv2
若没有安装这两个库，请去掉下述代码的注析并运行，待安装成功后再次重启服务即可使用。

```python
#pip install opencv-python
```

本次实验中用到OpenCV库，OpenCV是计算机视觉中经典的专用库，其支持多语言、跨平台，功能强大。 OpenCV-Python为OpenCV提供了Python接口，使得使用者在Python中能够调用C/C++，在保证易读性和运行效率的前提下，实现所需的功能。 

```python
import cv2
import numpy as np
```

### 步骤2：生成黑白渐变图

在这一步骤中，我们涉及到了前面实验中学习过的图像的旋转，利用所学知识生成一张从白到黑的渐变图片。

如果忘记步骤中函数的含义则需要返回之前的实验复习。

```python
# 创建黑色的图像
img = np.zeros((255,255,3), np.uint8)

#使用for循环逐行赋值
for i in range(255):
    img[i]=i

#使图像旋转180度
rows,cols,_ = img.shape
M = cv2.getRotationMatrix2D(((cols-1)/2.0,(rows-1)/2.0),180,1)
img = cv2.warpAffine(img,M,(cols,rows))
    
cv2.imshow('img',img)
cv2.waitKey(0)
```

### 步骤3：渐变图的阈值处理

cv2.threshold()可以用来进行图像阈值处理，cv2.threshold(src, thresh, maxval, type) 第一个参数是原图像，第二个参数是对像素值进行分类的阈值，第三个参数是当像素值高于(小于)阈值时，应该被赋予的新的像素值，第四个参数是阈值方法。函数有两个返回值，一个为retVal, 一个阈值化处理之后的图像。
除了在二值化实验中介绍的两种方法， 本实验介绍接下来数种简单全局阈值处理的方法：

![14](https://pic4.zhimg.com/80/v2-2f437dbd15665d84611472e6e7ca9ba8_720w.jpg)

```python
ret,th1 = cv2.threshold(img,127,255,cv2.THRESH_BINARY)
ret,th2 = cv2.threshold(img,127,255,cv2.THRESH_BINARY_INV)
ret,th3 = cv2.threshold(img,127,255,cv2.THRESH_TRUNC)
ret,th4 = cv2.threshold(img,127,255,cv2.THRESH_TOZERO)
ret,th5 = cv2.threshold(img,127,255,cv2.THRESH_TOZERO_INV)

titles = ['oringnal','BINGARY','BINGARY_INV','TRUNC','TOZERO','TOZERO_INV']
images = [img,th1,th2,th3,th4,th5]
i = 0
for i in range(6):
    plt.subplot(3,3,i+1)
    plt.imshow(images[i],'gray')
    plt.title(titles[i])
    plt.xticks([]),plt.yticks([])

plt.show()
```

从结果中我们可以非常直观的看到每个阈值参数的区别。


### 步骤4: 自定义阈值处理

先读取一副图片，图片颜色类型是RGB3色类型，将其转换成灰度类型的图像。

创建一个窗口来显示该图片可以检验转换结果

```python
img = cv2.imread('cat.jpg', 0);

cv2.namedWindow('img')
```

接着该程序创建两个滚动条来等待用户的输入：

第一个滚动条作用：选择阈值类型：二进制，反二进制，截断，0，反0。
第二个滚动条作用：选择阈值的大小。

```python
def nothing(x):
    pass
cv2.createTrackbar('threshold_type','img', 0, 4, nothing);

cv2.createTrackbar( 'threshold_value','img', 127, 255, nothing);
```

在这里等到用户拖动滚动条来输入阈值类型以及阈值的大小，或者是用户键入q健退出程序。

无论何时拖动滚动条，用户自定义的阈值函数都将会被调用。

```python
while(1):
    k = cv2.waitKey(1)
    if k == ord('q'):
        break
    threshold_type = cv2.getTrackbarPos('threshold_type','img')
    threshold_value = cv2.getTrackbarPos('threshold_value','img')
    #[cv2.THRESH_BINARY,cv2.THRESH_BINARY_INV,cv2.THRESH_TRUNC,cv2.THRESH_TOZERO,cv2.THRESH_TOZERO_INV]    
    ret,img_threshold = cv2.threshold(img,threshold_value,255,threshold_type)
    cv2.imshow('img',img_threshold)
    
cv2.destroyAllWindows()
```

#### 总结：

就像看到的那样，在这样的过程中，函数 threshold<> 会接受到5个参数：

src_gray: 输入的灰度图像的地址。
dst: 输出图像的地址。
threshold_value: 进行阈值操作时阈值的大小。
max_BINARY_value: 设定的最大灰度值（该参数运用在二进制与反二进制阈值操作中）。
threshold_type: 阈值的类型。从上面提到的5种中选择出的结果。

## 5 知识拓展

**图像阈值分割**

图像阈值分割是一种广泛应用的分割技术，利用图像中要提取的目标区域与其背景在灰度特性上的差异，把图像看作具有不同灰度级的两类区域(目标区域和背景区域)的组合，选取一个比较合理的阈值，以确定图像中每个像素点应该属于目标区域还是背景区域，从而产生相应的二值图像。
阈值分割法的特点是：适用于目标与背景灰度有较强对比的情况，重要的是背景或物体的灰度比较单一，而且总可以得到封闭且连通区域的边界。



## 6 课后实训

### 6.1 实训项目

根据实验内容,在自定义阈值窗口中拖动滑动条，找到使得图像轮廓最清晰的阈值以及阈值类型。





