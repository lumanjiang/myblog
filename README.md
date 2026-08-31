# 我的博客（Next.js + 网页写作后台）

网站本身用 Next.js 写，样式完全可以自己改；写文章不用碰代码，
在浏览器里打开 `你的网址/admin` 就能像用普通编辑器一样写、点发布就上线。

---

## 一、整体流程（先有个概念）

```
你在网页后台写文章
        ↓  点 Publish
文章自动存进 GitHub 仓库
        ↓  自动触发
Vercel 重新构建并上线（1~2 分钟）
        ↓
网站上就能看到新文章了
```

所以需要准备两个免费账号：**GitHub**（存代码和文章）和 **Vercel**（把网站跑起来）。

配置一次，以后写文章就只剩"打开网页 → 写 → 点发布"这一步了。

---

## 二、部署步骤

### 第 1 步：把项目传到 GitHub

1. 注册 / 登录 <https://github.com>
2. 点右上角 **+** → **New repository**
3. 仓库名填 `myblog`，选 **Public**（公开），其他不用动，点 **Create repository**
4. 创建后页面上会有一段 "…or upload an existing file" 的链接，点它
5. 把解压后 `myblog-next` 文件夹里的**所有文件**拖进去上传
   - ⚠️ 不要上传 `node_modules` 文件夹（如果有的话），其它都要
6. 点 **Commit changes** 提交

> 如果你会用 Git 命令行，也可以直接 `git init && git add . && git commit && git push`，效果一样。

### 第 2 步：改两个配置项

在 GitHub 上直接点开 `public/admin/config.yml` 文件，点右上角铅笔图标编辑，
把最上面这两行改成你自己的：

```yaml
repo: 你的GitHub用户名/myblog          # 例：zhangsan/myblog
base_url: https://你的网址.vercel.app   # 这个先随便填，第 3 步拿到网址后回来改
```

改完点 **Commit changes**。

### 第 3 步：部署到 Vercel

1. 打开 <https://vercel.com>，点 **Sign up**，选择 **Continue with GitHub** 用 GitHub 账号登录
2. 登录后点 **Add New...** → **Project**
3. 在列表里找到刚才创建的 `myblog` 仓库，点 **Import**
4. 什么都不用改，直接点 **Deploy**
5. 等一两分钟，会看到部署成功的画面，上面有你的网址，类似 `myblog-xxx.vercel.app`

**这时候网站已经能访问了**，只是写作后台还没配好，继续下一步。

拿到网址后，记得回到第 2 步把 `config.yml` 里的 `base_url` 改成这个真实网址。

### 第 4 步：开通网页写作后台

要让后台能登录并保存文章，需要在 GitHub 上创建一个「OAuth 应用」（就是一个授权用的钥匙）。

1. 打开 <https://github.com/settings/developers>
2. 点 **New OAuth App**
3. 按下面填写（把网址换成你自己的）：
   - **Application name**: `我的博客后台`（随便填）
   - **Homepage URL**: `https://你的网址.vercel.app`
   - **Authorization callback URL**: `https://你的网址.vercel.app/api/callback`
     （⚠️ 这一项必须完全正确，末尾是 `/api/callback`）
4. 点 **Register application**
5. 页面上会显示 **Client ID**，复制下来
6. 点 **Generate a new client secret**，生成后立刻复制 **Client Secret**
   （⚠️ 这个只显示一次，关掉页面就看不到了）

然后把这两个值填到 Vercel 里：

1. 回到 Vercel，进入你的项目 → 顶部 **Settings** → 左侧 **Environment Variables**
2. 添加两条：

   | Name                   | Value                |
   | ---------------------- | -------------------- |
   | `GITHUB_CLIENT_ID`     | 刚才复制的 Client ID |
   | `GITHUB_CLIENT_SECRET` | 刚才复制的 Secret    |

3. 保存后，去 **Deployments** 标签页，点最新那条右侧的 **···** → **Redeploy**，
   让新配置生效

### 第 5 步：开始写文章

打开 `https://你的网址.vercel.app/admin`，点 **Login with GitHub** 授权，
就进入写作后台了。

- 点左侧 **文章** → 右上角 **New 文章** 新建
- 填标题、日期、摘要、标签，正文区域直接写（支持富文本和 Markdown 切换）
- 图片可以直接拖进正文上传
- 写完点右上角 **Publish** → **Publish now**

发布后等 1~2 分钟，刷新网站首页就能看到新文章了。

---

## 三、日常使用

以后写文章只要记住一件事：**打开 `你的网址/admin`，写，点 Publish**。

不需要开电脑上的任何软件，手机、平板上打开这个网址也能写。

---

## 四、想改样式和信息的时候

| 想改什么                     | 改哪个文件                            |
| ---------------------------- | ------------------------------------- |
| 网站标题、简介、社交链接     | `site.config.js`                      |
| 颜色、字号、整体风格         | `app/globals.css`（顶部是配色变量）   |
| "关于"页面的内容             | `app/about/page.js`                   |
| 首页布局                     | `app/page.js`                         |

在 GitHub 网页上直接点开文件、点铅笔图标编辑、提交，Vercel 会自动重新部署，
不用在电脑上装任何东西。

配色变量在 `globals.css` 最上面，比如把 `--accent` 改成别的颜色值，
整站的强调色就变了；深色模式的配色在下面 `@media (prefers-color-scheme: dark)` 里。

---

## 五、（可选）在自己电脑上预览

如果以后想在本地改样式、实时看效果：

```bash
npm install     # 第一次需要，安装依赖
npm run dev     # 启动，浏览器打开 http://localhost:3000
```

需要先装 Node.js（<https://nodejs.org> 下载 LTS 版本）。不做这一步完全不影响使用。

---

## 六、绑定自己的域名（可选）

买了域名之后（比如在 Namecheap、阿里云、Cloudflare 买），
在 Vercel 项目里 **Settings → Domains** 添加域名，按提示在域名商那边改一下 DNS 就行，
Vercel 会自动配好 HTTPS 证书。

⚠️ 换了域名之后，记得同步更新两个地方：
- `public/admin/config.yml` 里的 `base_url`
- GitHub OAuth App 里的 Homepage URL 和 Authorization callback URL

---

## 七、遇到问题

**后台点登录没反应 / 报错**
检查 GitHub OAuth App 里的 callback URL 是不是 `https://你的网址/api/callback`，
以及 Vercel 的两个环境变量填了没、填完有没有重新部署。

**发布了但网站没更新**
去 Vercel 的 Deployments 页面看看最新一次构建是不是成功了（绿色对勾），
构建一般需要 1~2 分钟。

**文章不显示**
检查文章的 `draft` 是不是勾上了，草稿不会显示在网站上。
