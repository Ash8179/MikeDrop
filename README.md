# 合成大西瓜 PWA — 部署说明

## 文件结构
```
/
├── index.html       ← 游戏主文件
├── manifest.json    ← PWA 配置
├── sw.js            ← Service Worker（离线缓存）
└── images/
    ├── 1.png  … 11.png   ← 你的水果图片（从 Xcode Assets 导出）
```

## 第一步：导出图片

1. 打开 Xcode → 找到 Assets.xcassets
2. 对每个图片集（1 ~ 11）右键 → **Show in Finder**
3. 把 `1.png` ~ `11.png` 全部放进 `images/` 文件夹

## 第二步：部署到 HTTPS 服务器

PWA 必须通过 **HTTPS** 才能安装。推荐几个免费方案：

### 方案 A — GitHub Pages（最简单）
1. 在 GitHub 新建一个 repo（比如 `melon-game`）
2. 把所有文件（含 `images/` 文件夹）push 上去
3. Settings → Pages → Source 选 `main` 分支
4. 几分钟后访问 `https://你的用户名.github.io/melon-game/`

### 方案 B — Netlify（拖拽部署）
1. 把整个文件夹打包成 zip
2. 访问 https://app.netlify.com/drop
3. 直接把 zip 拖进去 → 自动分配 HTTPS 域名

### 方案 C — Vercel CLI
```bash
npm i -g vercel
cd 你的游戏文件夹
vercel --prod
```

## 第三步：iPhone 安装到主屏幕

1. 用 **Safari** 打开你的游戏网址
2. 点击底部 **分享** 按钮（方块+箭头图标）
3. 选择 **"添加到主屏幕"**
4. 点 **添加** 确认

安装后从主屏幕打开 → 全屏运行，无浏览器 UI，离线可玩，和原生 App 一样！

## 注意事项

- 图片文件名**大小写严格**：必须是小写 `.png`（不是 `.PNG` 或 `.JPG`）
- 如果你的原文件是 `.JPG`，先用 `fix_assets.sh` 脚本修复，或手动重命名后导出
- Service Worker 会缓存所有图片，第一次打开需要联网；之后离线也能玩
