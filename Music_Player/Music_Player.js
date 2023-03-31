/**
 * 1.Render sóng
 * 2.Scroll top
 * 3.Play/Pause/seek
 * 4.CD rotate
 * 5.Next /prev
 * 6.Random
 * 7.Next/Repeat when ended
 * 8.Activte song
 * 9.Scroll active song into view
 * 10.Playsong when click
 */






const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)
const PLAYER_STORAGE_KEY ="PLAYER"


    const heading = $('header h2')
    const cdThumb = $('.cd-thumb')
    const audio = $('#audio')
    const cd = $('.cd')
    const audioStartBTN = $('.btn-toggle-play')
    const player = $('.player')
    const audioPauseBTN = $('.btn-toggle-play')
    const iconPause = $('.fa-pause icon-pause')
    const progress = $('.progress')
    const nextBTN = $('.btn-next')
    const prevBTN =$('.btn-prev')
    const randomBTN = $('.btn-random')
    const repeatBTN = $('.btn-repeat')
    const playlist = $('.playlist')
const app ={
    isPlaying : false,
    currentIndex :0,
    isRandom : false,
    isRepeat : false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    song:[ 
          {
            name: "哪里都是你/Đâu đâu cũng là em",
            singer: "YoungCaptain",
            path:"./song/y2mate.com - vietsub  Đâu đâu cũng là em  YoungCaptain  哪里都是你   YoungCaptain.mp3",
            image: "https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/338791999_884261335999323_802754814794031653_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=amRNsRYYZDMAX901Gsj&_nc_ht=scontent.fdad3-6.fna&oh=03_AdRlKJYBaPn2eLl8WrjtjmXmoqunrk8d7UJe1UcpYdc4sw&oe=644E28C0"
          },
          {
            name: "ky niem",
            singer: "MCK",
            path: "./song/kyniem.mp3",
            image: "https://nguoinoitieng.tv/images/nnt/101/0/bfx9.jpg"
          },
          {
            name: " Anh Muốn Mình Như Con Thuyền Kia",
            singer: "Ngắn x Mhee",
            path: "./Music_Player/song//AnhMuonMinhNhuConThuyenKiaLaoVaoEmRoiDamChim-NganMHee-8770029.mp3",
            image:
              "https://baochauelec.com/cdn/images/tin-tuc/loi-bai-hat-anh-muon-minh-nhu-con-thuyen-kia-ngan-mhee-ban-chuan.jpg"
          },
         
          {
            name: "ghệ iu dấu của em ơi",
            singer: "tlinh",
            path: ".song/GheIuDauCuaEmOivocals-tlinh2pillzWOKEUPAT4AM-8770077.mp3",
            image:
              "https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/3/13/photo-5-16786819800641509230338.jpeg"
          },
          {
            name: "Thắc Mắc",
            singer: "Thịnh Suy",
            path: "./song/thacmac.mp3",
            image:
              "https://media.vov.vn/sites/default/files/styles/large/public/2020-11/1_221.jpg"
          },
          {
            name: "Anh thương em nhất mà",
            singer: "Tường Quân x LÃ",
            path:
              "./song/AnhThuongemnhatma.mp3",
            image:
              "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/fc/9c/b1/fc9cb14b-c923-20df-ee43-482b26b1d422/cover.jpg/316x316bb.webp"
          },
          {
            name: "Lời của tui",
            singer: "Khánh aka Gôn",
            path: "./song/tuitalk.mp3",
            image:
              "https://scontent.fdad4-1.fna.fbcdn.net/v/t1.15752-9/338700126_255257220174635_9033814268089438045_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=h5lY-tUPykcAX-UMcQq&_nc_ht=scontent.fdad4-1.fna&oh=03_AdTHabEV_osHnGS10eWNNWWsg1b1me9o-4L6cKgmm9naYw&oe=644CDFAF"
          }
        ],
    setConfig: function(key,value){
      this.config[key] = value;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function(){
        const html = this.song.map((song,index)=>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}"data-index=${index}>
      <div class="thumb" style="background-image:url('${song.image}');"></div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`
        })
       playlist.innerHTML = html.join('')
    },
    defineProperties : function(){
          Object.defineProperty(this,'currentSong',{
            get : function(){
              return this.song[this.currentIndex]
            }
          })
          
        },
    handleEvent : function(){
      const cdWidth = cd.offsetWidth
      
      const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
      ],{
        duration : 10000,
        iterations : Infinity
      })
      cdThumbAnimate.pause()
      document.onscroll = function(){
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const newCdWidth = cdWidth - scrollTop

        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0

        cd.style.opacity = newCdWidth / cdWidth
      }

      audioStartBTN.onclick = function(){
        if(app.isPlaying){
          audio.pause()
        } else {   
          audio.play()
      }
    }
    audio.onplay = function(){
      app.isPlaying = true 
      player.classList.add('playing')
      cdThumbAnimate.play()
    }      
    audio.onpause = function(){
      app.isPlaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }

    audio.ontimeupdate = function(){
    if(audio.duration){
      const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
      progress.value = progressPercent
    }
    progress.onchange = function(){
      const seekTime = audio.duration / 100 * progress.value
      audio.currentTime = seekTime
    }

    }   
    nextBTN.onclick =function(){
      if(app.isRandom){
        app.playRandomSong()
      } else{
        app.nextSong()};
      audio.play()
      app.render()
      app.scrollToActiveSong()
    }
    prevBTN.onclick =function(){
      if(app.isRandom){
        app.playRandomSong()
      } else{
      app.prevSong()};
      audio.play()
      app.render()
      app.scrollToActiveSong()

    }
    randomBTN.onclick = function(){
      app.isRandom= !app.isRandom
      app.setConfig("isRandom",app.isRandom)
      randomBTN.classList.toggle('active',app.isRandom)
     
    }
    audio.onended =function(){
     if(app.isRepeat){
        audio.play()
     } else{
      nextSong.click()
     }
    }
    playlist.onclick =function(e){
      const songNode = e.target.closest('.song:not(.active)')
      if(songNode || e.target.closest('.option')){
        if(songNode){
          app.currentIndex = Number(songNode.dataset.index)
          app.loadCurrentSong()
          audio.play()
          app.render()
        }
      }
    }
    repeatBTN.onclick = function(){
      app.isRepeat = !app.isRepeat
      app.setConfig("isRepeat",app.isRepeat)
     
      repeatBTN.classList.toggle('active',app.isRepeat)
    }
    }, 
    scrollToActiveSong: function(){
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior :"smooth",
          block:"nearest"
        })
      }, 300);
    },
    nextSong: function(){
      this.currentIndex++
      if(this.currentIndex >= this.song.length ){
        this.currentIndex = 0
      }
      this.loadCurrentSong()
    },
    prevSong: function(){
      this.currentIndex--
      if(this.currentIndex < 0){
        this.currentIndex = this.song.length - 1 
      }
      this.loadCurrentSong()
    },
    playRandomSong: function(){
      let newIndex
      do{
        newIndex = Math.floor(Math.random()*this.song.length)
      }while(newIndex === this.currentIndex)
     this.currentIndex = newIndex
     this.loadCurrentSong()
    },
   
    

    loadCurrentSong : function(){
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path

      
    },
    
    loadConfig: function(){
      this.isRandom =this.config.isRandom
      this.isRepeat =this.config.isRepeat
    },
  
    start: function(){
      this.loadConfig()
      this.defineProperties()
      this.render()
      this.loadCurrentSong()
      this.handleEvent()
      randomBTN.classList.toggle('active',app.isRandom)
      repeatBTN.classList.toggle('active',app.isRepeat)
    },

    
}
app.start()