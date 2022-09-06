IMAGE_UR="https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png/revision/latest"
BACKGROUND_URL="https://i.pinimg.com/originals/df/a7/21/dfa721c5db3faedec74a213fb333ed33.jpg"

curl "http://localhost:3000/joinImages?img=$IMAGE_UR&background=$BACKGROUND_URL"

autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_UR&background=$BACKGROUND_URL"