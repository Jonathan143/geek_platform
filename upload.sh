#! /bin/bash
cur_dateTime="`date +%Y-%m-%d_%H:%m:%s`"  
echo "开始打包 $cur_dateTime"
echo '正在更新依赖...'
yarn
echo '正在打包...'
yarn build
echo '打包成功！'

echo '#############################################'

echo '\n请输入服务器密码\n'
scp -rP 666 ./dist/* root@服务器ip:上传目录

echo '\n#############################################'
echo '\n上传文件至服务器成功\n'