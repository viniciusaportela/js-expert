# find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'

# npm i -g ipt

find . -name *.js -not -path '*node_modules**' | ipt

# 1s -> first line
# ^ -> first column
CONTENT="'user strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\\n/g' {file}