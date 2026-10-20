# GitHub Pages 部署指南

本项目已预先完成所有 GitHub Pages 适配配置（包括 `base: './'` 相对路径打包、GitHub Actions 自动化流水线及 `gh-pages` 一键部署脚本）。

---

## 方案一：通过 GitHub Actions 自动部署（推荐，最省心）

无需手动打包上传，每次向 `main` 分支提交代码都会自动编译并上线。

### 步骤：
1. **在 GitHub 上新建仓库**（例如命名为 `chinese-emperors-scroll`）；
2. **在本地将代码提交并推送到 GitHub**：
   ```bash
   git init
   git add .
   git commit -m "feat: 中华历代帝王长卷"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
   git push -u origin main
   ```
3. **开启 GitHub Pages 权限**：
   - 进入 GitHub 仓库页面，点击 **Settings**（设置）-> **Pages**；
   - 在 **Build and deployment** 下的 **Source**（来源）下拉菜单中选择 **GitHub Actions**；
   - 切换后，已就绪的 `.github/workflows/deploy.yml` 会自动触发工作流；
   - 等待 1~2 分钟，部署完成后即可在页面上方查看到专属访问地址（如 `https://<用户名>.github.io/<仓库名>/`）。

---

## 方案二：使用 gh-pages 命令行一键部署

如果你习惯在本地通过命令行直接推送打包好的静态产物：

1. 确保已关联远程仓库后，在项目根目录直接运行：
   ```bash
   npm run deploy
   ```
2. 该命令会自动执行 `npm run build`，并将生成的 `dist` 目录直接推送到远程的 `gh-pages` 分支；
3. 进入 GitHub 仓库的 **Settings** -> **Pages**，将 **Source** 选为 **Deploy from a branch**，分支选择 **gh-pages** / `(root)` 并保存即可。
