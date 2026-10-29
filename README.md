# 光光浏览器 GeoBrowser

> 一款可完全控制网页定位的安卓浏览器，同时支持把系统摄像头/麦克风权限交给网页，方便人脸识别等功能。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Android](https://img.shields.io/badge/Android-8.0%2B-green.svg)]()
[![Platform](https://img.shields.io/badge/platform-Android-lightgrey.svg)]()

## 下载安装

1. 打开本仓库的 **[Releases](https://github.com/chunguangma2001-lab/GeoBrowser/releases)** 页面
2. 下载最新的 `GeoBrowser.apk`
3. 传到手机，允许安装未知来源应用后安装
4. 安装后应用名显示为「光光浏览器」

> 如果 Releases 还没有自动生成，可以在本地用 Android Studio 打开项目编译，或等待 GitHub Actions 构建完成。

## 操作指南

### 1. 基本浏览

- **地址栏**：输入网址或关键词（关键词会自动用百度搜索），按回车打开
- **后退**：点左上角箭头；**长按** = 前进
- **菜单**：右上角三点，可以刷新、回主页、复制链接、用其他浏览器打开、清除缓存和 Cookie
- **定位按钮**：右上角圆形图标，颜色代表当前定位模式

### 2. 定位控制（核心功能）

点右上角定位按钮打开「定位控制」面板，可以选择以下模式：

| 模式 | 颜色 | 说明 |
|------|------|------|
| 系统定位 | 绿色 | 使用真实 GPS，或安卓「模拟位置信息应用」提供的位置 |
| 自定义位置 | 蓝色 | 所有网页都拿到你设定的坐标 |
| 禁止定位 | 红色 | 一律拒绝网页的定位请求 |
| 每次询问 | 橙色 | 网页请求定位时弹窗，由你选择给真实、自定义还是拒绝 |

#### 自定义位置的三种获取方式

1. **点地图**  
   在地图上点击任意位置，即可设为当前坐标。支持高德、卫星、腾讯、国际四种图层（优先国内源）。

2. **搜索地点**  
   在搜索框输入地名（如「上海外滩」「北京天安门」），点搜索。  
   - 不填 Google Key 时使用免费源（Photon / Nominatim）  
   - 填入 Google Maps API Key 后优先使用谷歌地图搜索

3. **粘贴坐标**  
   直接粘贴坐标（支持 `116.397,39.908` 或 `39.908,116.397`），会自动识别经纬度顺序和坐标系。

其他设置：
- **坐标系**：支持 GCJ-02（高德/腾讯/谷歌中国）、BD-09（百度）、WGS-84（GPS 原始），自动换算成网页标准的 WGS-84
- **精度 / 海拔 / 随机漂移**：可调
- **常用地点收藏**：方便快速切换

### 3. 摄像头 / 人脸识别

当网页调用 `getUserMedia` 请求摄像头或麦克风时：
1. 系统会弹出权限请求
2. 同意后，网页即可正常使用摄像头做人脸识别等操作
3. 拒绝则网页会收到权限被拒的回调

建议把系统的 **Android System WebView** 更新到最新，兼容性更好。

### 4. 定位请求日志

在定位控制面板下方可以查看哪些网站、什么时间请求了定位，以及最终拿到了什么结果。

## 原理简介

在每个页面（包括 iframe）脚本执行前注入一段脚本，替换 `navigator.geolocation` 的 `getCurrentPosition` / `watchPosition` / `clearWatch`。请求通过 `WebMessageListener` 交给 App 决定返回什么位置；旧版 WebView 不支持时用 `JavascriptInterface` 兜底。

## 编译

### GitHub Actions（推荐）
推送代码后会自动编译，完成后在 **Releases** 里下载 APK。

### 本地
用 Android Studio 打开本目录（需要 JDK 17、Android SDK 34），等待同步后点 **Build → Build APK(s)**。

## 要求

- Android 8.0（API 26）及以上
- 建议更新 Android System WebView

## 开源协议

MIT License，欢迎使用、修改和分发。

---

**光光浏览器** — 让网页拿到你想要的位置。
