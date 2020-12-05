angular.module("dexter", [])
  .controller("gameController", function($scope) {
    $scope.gamePaused = false;
    $scope.levels = [1,2,3,4,5,6,7,8,9,10];
    $scope.maxLevel = parseInt(dataStorage.getItem("maxLevel"));
    $scope.maxDifficulty = parseInt(dataStorage.getItem("maxDifficulty"));
    $scope.difficulty = difficulty;
    $scope.currentLevel = currentLevel;
    $scope.playMusic = true;
    $scope.setLevel = function(level){
      // endLevel();
      timeTaken = 0;
      $scope.gamePaused = pause = homeScreen = false;
      $scope.currentLevel = currentLevel = level;
      // dataStorage.setItem("currentLevel", currentLevel);
    }
    $scope.pauseGame = function(event){
      event.stopPropagation();
      event.preventDefault();
      $scope.gamePaused = homeScreen = true;
      vx = vy = 2;
    }
    $scope.toggleMusic = function(){
      $scope.playMusic = !$scope.playMusic;
      if(!$scope.playMusic){
        bgMusic.pause();
      }
    }
    $scope.setDifficulty = function(chosenDifficulty){
      $scope.difficulty = difficulty = chosenDifficulty;
      if(chosenDifficulty == 1){
        img = loadImage("img/green.png");
        rad = 50;
      }
      if(chosenDifficulty == 2){
        img = loadImage("img/mask.png");
        rad = 45;
        delta = 0.5;
        accelFactor = 10;
      }
      if(chosenDifficulty == 3){
        img = loadImage("img/mask.png");
        rad = 35;
      }
      // dataStorage.setItem("difficulty", difficulty);
      // $scope.gamePaused = pause = false;
    }
    $scope.updateLevel = function(){
      $scope.currentLevel = currentLevel;
      $scope.difficulty = difficulty;
    }

  });
