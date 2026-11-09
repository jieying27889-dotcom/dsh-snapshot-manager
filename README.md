# 鲸鱼快照 · DeepSeek Harness 插件 v1.2.0

适用于 Windows 10/11 和 DeepSeek Harness 桌面端。内置按钮使用 Harness 的 `sidebar.footer.action` 插槽，弹出原生 React 管理面板，无需斜杠命令。

## 一行文字安装（推荐）

在 Harness 的**插件管理器安装输入框**中粘贴下面这一行：

```text
github:jieying27889-dotcom/dsh-snapshot-manager#v1.2.0
```

随后点击安装并重新启动 Harness。这里使用的是 **GitHub 简写源**，不是 npm 包名；Harness 会把它作为 GitHub 插件依赖交给包管理器。若 Harness 的当前版本不支持该来源，下载 GitHub Releases 的 Harness 插件 ZIP，解压后安装包含 `package.json` 的本地目录。

暂未发布成 npm 包，因此不能仅输入 `dsh-snapshot-manager@1.2.0`。

## 按钮颜色与状态

| 状态 | 效果 |
| --- | --- |
| 可以备份 | 图标和文字均为蓝色 |
| 不能备份或状态未知 | 图标和文字均为红色 |
| 正在备份 | 显示进度百分比 |
| 备份成功 | 显示绿色对勾，**直到用户再次点击才清除** |
| 备份取消或失败 | 不会误报成功 |

## 独立窗口与完整卸载

- 点击「打开独立窗口」会通过本地后台服务打开 Edge 应用窗口。窗口与 Harness 主界面分开，仍使用相同的本地快照服务，不额外创建一套互相争抢端口的数据库。
- 完全卸载入口位于内置面板的「Harness 内置插件」区域。只有通过保守空闲检查，按钮才可以点击。
- 点击卸载入口会打开**外部独立窗口**，展示删除范围；只有用户点击检查并输入 `彻底删除 DeepSeek Harness`、确认没有后台任务，再通过最后确认才执行。
- 卸载由复制到本机 LocalAppData 的独立工作程序完成，先尝试正常关闭 Harness，再调用官方卸载器，确认其执行完成后才清理确定归属的残留文件和注册表项。无法确认任务状态时禁止自动关闭或卸载。
- 默认保留鲸鱼快照备份仓库、回滚记录和其他软件共用的缓存；不会清理任意自定义路径或软链接目标。

## 注意

“最近会话记录没有写入”是保守的活动线索，不保证检测到所有长时间不写文件的任务。用户必须自行确认所有 AI 对话与后台任务均已结束，才允许继续。正式卸载会删除数据，可能需要管理员权限；执行结果会留下日志。此功能经过隔离环境验证，未在用户真实 Harness 安装上执行过卸载。

卸载完成后内置插件也将随 Harness 数据删除。外部独立版仍可运行。

## 发布包结构

`package.json`、`cordis.patch.yml`、`index.js`、`client.js` 和 `bin/WhaleSnapshot.exe`。

本插件不要求单独安装 Python。代码和安装包在 [GitHub](https://github.com/jieying27889-dotcom/dsh-snapshot-manager)。
