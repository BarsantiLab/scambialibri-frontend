#!/bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        -e|--env|--environment)
        ENVIRONMENT="$2"
        shift
        shift
        ;;
    esac
done

set -- "${POSITIONAL[@]}"

DATE=$(date +"%Y-%m-%d_%H_%M")
# DATE="YAY"
NAME="scambialibri-frontend-${ENVIRONMENT}-${DATE}.tar.gz"
SSH_KEY="~/.ssh/id_rsa_personal"
WORK_DIR=`mktemp -d`

echo "Temp dir: ${WORK_DIR}"

case "$ENVIRONMENT" in
    qa) REMOTE_DIR="dev-frontend" ;;
    prod|production) REMOTE_DIR="frontend" ;;
    *) echo "Error getting environment!"; exit 1;
esac

rm -rf dist
ng build -e=$ENVIRONMENT --verbose
tar czf $WORK_DIR/scambialibri-frontend-$ENVIRONMENT-$DATE.tar.gz dist/
scp -i $SSH_KEY $WORK_DIR/$NAME deploy@loscambialibri.it:~/$REMOTE_DIR/releases/$NAME
ssh deploy@loscambialibri.it -i $SSH_KEY -t "cd ~/${REMOTE_DIR}/ && rm -rf dist && tar xzf ./releases/${NAME}"
rm -rf $WORK_DIR