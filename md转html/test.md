# 产品白皮书
## 产品定义
[AI开放平台](https://ai.chumenwenwen.com)是出门问问提供的一套全链路语音交互方案配置平台，旨在实现更友好的人机交互，为企业及开发者提供语音唤醒、语音识别、自然语言处理、垂直搜索、语音合成等能力。目前已经应用在智能车载、智能音响、智能手表、智能耳机、手机虚拟助理、机器人、智能客服等多个领域，让您的产品真正做到能听会说。

AI开放平台提供全链路语音配置能力，包括**语音识别（ASR）配置**、**语义技能（Skill）自定义及复用**、**问答库（Q&A）自定义**、**信息源&垂直搜索（OneBox）配置**、**语音合成（TTS）配置**等功能，并提供**Android SDK**、**Linux SDK**、**openAPI（基于HTTP协议** 等接入方式供不同产品形态进行调用。同时，我们提供**前端DSP算法**，配合多麦克风阵列，实现**降噪**、**声源定位**、**回声消除**等音频信号处理能力。

## 应用领域
出门问问的全链路语音解决方案已经成功应用在智能车载、智能音响、智能手表、虚拟助理、智能电视等多个垂直领域。AI开放平台作为配置工具，目前已经提供了多套全链路解决方案，包括但不限于**车载解决方案**、**音响解决方案**、**电视解决方案**。用户在开放平台上通过解决方案模版创建自己的应用就可以获得该领域的完整语音配置，从而大大降低了用户的开发成本。

**车载场景**中，开放平台提供了针对车载定制的ASR模型，配合多麦克风方案实现远场识音、降噪，可以有效降低行车过程中噪音带来的影响。语义理解部分提供“*导航*”，“*POI*”，“*打电话*”，“*车载设备控制*”等车载常用技能。

**智能音响场景**中，开放平台提供了智能音响定制ASR模型，针对家居场景进行优化，保证识别率的同时降低误唤醒。语义理解部分提供“*查天气*”，“*听音乐*”，“*设置日程*”，“*智能家居控制*”等常用技能，配合智能家居产品可实现智能家居的语音控制和联动。

**智能电视场景**中，开放平台提供了远场语音识别能力，有效提高家居场景中远距离识音准确率。语义理解部分提供“*播放控制*”，“*视频点播*”，“*查新闻*”等常用技能，满足用户收看电视时的需求。

AI开放平台作为语音配置工具，能力不仅限于以上场景，开发者可利用开放平台开发出更多场景的有趣应用。

## 产品框架
![产品框架图](http://mobvoi-ai-public.ufile.ucloud.cn/img/feature_matrix.png)

## 产品功能
AI开放平台提供了前端信号处理、语音识别、语义理解、语音合成等各独立语音模块，开发者可以根据实际需求配置不同的服务，也可以将各模块联合起来打造全链路语音交互方案。

### 信号处理
**信号处理**是指终端设备对麦克风接收到的音频信号进行处理，具有声源定位、噪音抑制、回声消除等能力。配合多麦克风阵列，提高输入信号质量。

### 语音唤醒
**语音唤醒**是在设备待机状态下唤醒为正常运行状态，接收语音并进行交互。出门问问的语音唤醒算法在保证低误唤醒率的同时唤醒率可达到**95%**，并支持唤醒词的定制。

### 语音识别
**语音识别**是将语音信号转换成文本的技术。出门问问针对不同使用场景优化了多个语音识别模型，并保证每个模型在非极端条件下**98%** 的识别率，处于业界领先水平。识别结果响应时间在**180ms**以内，实现流程自然的对话。

### 语义理解
**语义理解**（NLU）是将自然语言解析成计算机可以理解的结构化数据，以便进行垂直搜索等处理。

例如用户问“*明天北京天气如何？*”，语义理解处理后的数据如下：

```
{
    "semantic": {
        "slots": {
            "location": [{
                "prob": 0.9982126511139905,
                "task_turn_id": 0,
                "detail_info": {
                    "province": "",
                    "city": "北京市",
                    "district": "",
                    "business_district": "",
                    "name": ""
                },
                "index": {
                    "2-4": "北京"
                },
                "isNegligible": true,
                "raw_data": "北京",
                "location_info": {
                    "city": ["北京"]
                },
                "norm_value": "北京市"
            }],
            "time": [{
                "prob": 0.9927141757144912,
                "task_turn_id": 0,
                "index": {
                    "0-2": "明天"
                },
                "isNegligible": true,
                "raw_data": "明天",
                "norm_value": {
                    "type": "period",
                    "content": [[2019,4,13,0,0,0],[2019,4,13,23,59,59]],
                    "status": "valid"
                },
                "status": "valid"
            }]
        },
        "domain": "public.weather",
        "confidence": 0.99986774,
        "intent": "other"
    },
    "inform": {
        "location": "北京::北京市",
        "time": "明天::[[2019,4,13,0,0,0],[2019,4,13,23,59,59]]",
        "eav": "other::other",
        "intent": "other::other"
    }
}
```

### 语音合成
**语音合成**是指将文字转化为特定音色的声音，并由终端设备播放。出门问问提供了多种音色供开发者选择，语种包括**普通话**、**粤语**、**英语**等。支持语速、音色调整等自定义配置。

### 垂直搜索
**垂直搜索**是出门问问为开发者提供的资源搜索服务，配合语义理解使用，为用户查找相应的回答。常见的垂直搜索如*查天气*、*导航*、*音乐*、*新闻*等。

例如用户问“*明天北京天气如何？*”，垂直搜索利用语义解析查询到的结果如下：

```
{
    "icon": "http://cdn.chumenwenwen.com/weather-onebox/moji_20180130.png",
    "params": {
        "weatherType": "forecast",
        "queryDate": {
            "carWashIndex": "2",
            "date": "04月13日",
            "dateTime": "1555084800000",
            "sunrise": "05:40:00",
            "maxTemp": "19",
            "cold": "感冒容易发生，少去人群密集的场所有利于降低感冒的几率。",
            "sportsIndex": "4",
            "windDir": "东北风",
            "tips": "可以正常在户外活动，易敏感人群应减少外出。",
            "weekDay": "周六",
            "weather": "阴转少云",
            "windSpeed": "4.4",
            "sports": "空气轻度污染，不宜在户外运动。",
            "fishing": "气压小幅波动，可能会影响鱼儿进食。",
            "weatherBg": "gloomy",
            "uvi": "2",
            "pm25Type": "良",
            "aqiType": "Moderate",
            "carWash": "无雨且风力较小，易保持清洁度。",
            "minTemp": "9",
            "imgUrl": 
            "unit": "C",
            "sunset": "18:50:00",
            "aqi": "75",
            "location": "北京市",
            "currentTemp": "",
            "updatetime": "2019-04-12 12:40:08",
            "weatherNight": "少云",
            "cloth": "天气微凉，适宜穿羊毛衫、夹克衫、马甲衬衫配长裤等秋装。",
            "status": "success",
            "wind": "3级"
        }
    }
    ...
}
```

### 话术生成
**话术生成**是指系统将垂直搜索得到的结构化数据转换成人类语言，目前出门问问官方提供的技能都包含对应的返回话术。同时，支持开发者根据需求自定义返回话术。

例如用户问“*明天北京天气如何？*”，话术生成将垂直搜索的结果转换成如下话术：

```
{
    "displayText": "北京市明天阴转少云，9到19°C。天气微凉，适宜穿羊毛衫、夹克衫、马甲衬衫配长裤等秋装。",
    "tts": "北京市明天阴转少云，9到19°C。天气微凉，适宜穿羊毛衫、夹克衫、马甲衬衫配长裤等秋装。"
}
```

## 支持平台
AI开放平台目前提供了多种集成方式，包括 SDK、HTTP协议等方式。
- SDK目前提供了*Android*、*Linux*平台，并提供*全量版*、*精简版*两种SDK；
- HTTP协议接口目前提供了*ASR接口*、*TTS接口*、*NLP接口*、*OneBox接口*。

