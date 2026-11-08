# 鲸鱼快照 · DeepSeek Harness 内置插件 v1.1.0

**平台：Windows 10/11，DeepSeek Harness 桌面端。**

本目录就是可安装的 Harness 插件包根目录，包含 `package.json`、`cordis.patch.yml`、`index.js`、`client.js` 和 `bin/WhaleSnapshot.exe`。

## 安装方式

1. 解压发布包 `WhaleSnapshot-Harness-Plugin-v1.1.0.zip`。
2. 在 DeepSeek Harness 的插件管理中选择“本地目录”安装。
3. 选择解压后**包含 `package.json` 的文件夹**（不要只选择其中的 `bin`）。
4. 安装成功后重新启动 Harness。左下角会显示「鲸鱼快照」，点击即可打开原生 React 面板。

也可以通过 Harness 自带的命令行安装本地目录：

```powershell
"D:\AI\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop add "本插件目录的绝对路径"
```

若仓库上传到 GitHub，可在 Harness 插件管理的 GitHub 安装入口中填写对应仓库 URL。**安装前请确认仓库根目录含有本插件的 `package.json` 和 `bin/WhaleSnapshot.exe`**。

## 工作机制

- 左下角按钮使用 Harness 官方 `sidebar.footer.action` 插槽；不需要输入 `/snapshot`。
- 按钮打开的是 Harness 内部 React 面板，不使用 `iframe`，不会自动打开浏览器。
- Host 端通过相对于 `index.js` 的路径寻找 `bin/WhaleSnapshot.exe`，自动以 `--no-browser` 模式启动同捆后台。
- 本地后台服务只监听 `127.0.0.1:8757`。独立版和内置版可以共享同一服务。
- 版本快照、配置和私人会话**不会包含在发布包内，也不应提交 GitHub**。

## 使用注意

- 还原操作会覆盖 Harness 的部分文件；务必先完全退出 Harness，并仔细核对差异。
- 本版拒绝路径越界的快照名、同时进行多项备份/还原，以及在 Harness 运行时还原。
- 快照存储目录和运行日志均位于用户电脑上。配置默认写入 `%LOCALAPPDATA%\WhaleSnapshot\config.json`。
- 没有代码签名的个人软件可能触发 Windows SmartScreen 提示；请仅从可信来源安装。

## 构建与维护

发布包直接安装，不要求本地另装 Python。需要二次开发时，使用独立源码项目 `dsh-toolkit`；不要把 `.dsh`、`config.json`、`dsh-snapshots`、测试缓存或个人凭据提交到仓库。
