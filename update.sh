echo "开始自助更新"
pnpm docs:build
git add .
git commit -m "update"
git push
echo ""
echo ""
echo ""
echo "更新完成！又是努力的一天哦！"