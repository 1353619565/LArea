# LArea v2.0.0 移动端城市选择控件

纯原生 js 的 **移动端** 城市选择插件，不依赖任何库

数据来源: [Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)
> 提示：当前数据未包含港澳台
## 用法

在 html 页面中引入 input 标签，写法如下：

```
...
<input id="demo1" type="text" readonly="" name="input_area" placeholder="请选择城市" />
...
```

将样式文件引入到页面中：

```
...
<link rel="stylesheet" href="css/LArea.css">
...
```

同时引入 js 文件到页面中：

```
...
<script src="js/LArea.js"></script>
...
```

初始化插件：

```
...
var area = new LArea();
area.init({
  'trigger': '#demo1',// 触发选择控件的文本框，同时选择完毕后name属性输出到该位置
  'valueTo': '#value1',// 选择完毕后id属性输出到该位置
  'keys': {id:'id',name:'name'},// 绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
  'type': 1,// 数据源类型
  'data': LAreaData// 数据源
});
...
```

自定义数据源结构参考：

```
// 初始化type=1时，参考下列数据源

var LAreaData1 = [{
    "id": "2",
    "name": "一级",
    "child": [{
      "id": "21",
      "name": "二级1",
      "child": [{
        "id": "211",
        "name": "三级1"
      }, {
        "id": "212",
        "name": "三级2"
      }, {
        "id": "213",
        "name": "三级3"
      }]
    }, {
      "id": "22",
      "name": "二级2"
    }, {
      "id": "23",
      "name": "二级3"
    }]
  }];

// 初始化type=2时，参考下列数据源

var provs_data = [{
    "text": "省",
    "value": "1"
  }, {
    "text": "省",
    "value": "2"
  }];
var citys_data = {
    "1": [{
      "text": "市",
      "value": "11"
    }, {
      "text": "市",
      "value": "12"
    }],
    "2": [{
      "text": "市",
      "value": "21"
    }, {
      "text": "市",
      "value": "22"
    }]
  };
var dists_data = {
    "11": [{
      "text": "区",
      "value": "111"
    }, {
      "text": "区",
      "value": "112"
    }],
    "21": [{
      "text": "区",
      "value": "211"
    }, {
      "text": "区",
      "value": "212"
    }]
  };
```

代码会持续优化，如果喜欢望赏颗星。
