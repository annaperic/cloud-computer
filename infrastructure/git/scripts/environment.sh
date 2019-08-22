GIT_EMAIL=$(git config --get user.email)
GIT_NAME=$(git config --get user.name)
CLOUD_COMPUTER_GIT_URL=$(git config --get remote.origin.url)

# Handle repositories cloned using ssh, we only clone using http
if [ "${CLOUD_COMPUTER_GIT_URL#*'git@github.com'}" != "$CLOUD_COMPUTER_GIT_URL" ]; then
  CLOUD_COMPUTER_GIT_URL=$(echo $CLOUD_COMPUTER_GIT_URL | sed 's;git@github.com:;https://github.com/;')
fi

echo export GIT_COMMITTER_EMAIL=${GIT_COMMITTER_EMAIL-$GIT_EMAIL}
echo export GIT_COMMITTER_NAME=${GIT_COMMITTER_NAME-$GIT_NAME}
echo export CLOUD_COMPUTER_GIT_BRANCH=$(git branch --contains $(git describe --always) | grep \* | cut -c 3-)
echo export CLOUD_COMPUTER_GIT_URL=$CLOUD_COMPUTER_GIT_URL
