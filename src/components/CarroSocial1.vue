<template>
  <section class="carro-social1">
    <div class="carro-social1__container">
      <h2 class="hashtag">#GerandoSorrisos</h2>
      
      <div class="rating-card">
        <div class="stars">
          <span class="material-icons" v-for="i in 5" :key="i">star</span>
        </div>
        <p class="rating-text">Mais de 450.000 crianças felizes</p>
      </div>

      <div class="message">
        <p>Não perca a oportunidade de fazer seu pequeno sorrir! Aproveite a nossa promoção para deixar o filme do Stitch ainda mais mágico!</p>
      </div>

      <div class="testimonials">
        <swiper
          :modules="modules"
          :slides-per-view="1.2"
          :space-between="16"
          :loop="true"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :speed="1000"
          class="testimonials-swiper"
        >
          <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-card">
              <div class="testimonial-header">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="avatar" />
                <div class="testimonial-info">
                  <h3>{{ testimonial.name }}</h3>
                  <div class="stars">
                    <span class="material-icons" v-for="i in 5" :key="i">star</span>
                  </div>
                </div>
              </div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default {
  name: 'CarroSocial1',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay],
      testimonials: [
        {
          name: "@Cecilia_Alves",
          avatar: require("@/assets/imgs/avatar16.jpg"),
          text: "Superou minhas expectativas! A qualidade e o carinho são evidentes."
        },
        {
          name: "@Luiza_Pereira",
          avatar: require("@/assets/imgs/avatar17.jpg"),
          text: "Minha filha amou tanto que já pediu outro para o aniversário dela!"
        },
        {
          name: "@Marina_Castro",
          avatar: require("@/assets/imgs/avatar18.jpg"),
          text: "Recomendo demais! É lindo ver a felicidade dela ao assistir."
        },
        {
          name: "@Gabriela_Moraes",
          avatar: require("@/assets/imgs/avatar16.jpg"),
          text: "Que presente mágico! Minha filha não se cansa de assistir, cada vez é uma emoção diferente."
        },
        {
          name: "@Rafaela_Duarte",
          avatar: require("@/assets/imgs/avatar17.jpg"),
          text: "Incrível como cada detalhe foi pensado. A personalização ficou perfeita!"
        },
        {
          name: "@Fernanda_Campos",
          avatar: require("@/assets/imgs/avatar18.jpg"),
          text: "Melhor presente que já dei! O sorriso dela não tem preço."
        },
        {
          name: "@Patricia_Nunes",
          avatar: require("@/assets/imgs/avatar19.jpg"),
          text: "Recomendo de olhos fechados. A felicidade da minha pequena foi contagiante!"
        },
        {
          name: "@Camila_Barros",
          avatar: require("@/assets/imgs/avatar20.jpg"),
          text: "Superou todas as expectativas! Minha filha ficou encantada com cada momento."
        },
        {
          name: "@Leticia_Vieira",
          avatar: require("@/assets/imgs/avatar21.jpg"),
          text: "Um presente único e especial. Vale muito a pena ver a alegria dela!"
        },
        {
          name: "@Amanda_Torres",
          avatar: require("@/assets/imgs/avatar22.jpg"),
          text: "Simplesmente maravilhoso! A qualidade e o carinho são evidentes em cada detalhe."
        },
        {
          name: "@Renata_Pires",
          avatar: require("@/assets/imgs/avatar23.jpg"),
          text: "Minha filha não para de assistir! Foi o presente mais especial que ela já ganhou."
        },
        {
          name: "@Daniela_Melo",
          avatar: require("@/assets/imgs/avatar24.jpg"),
          text: "Uma experiência única! Ver o rostinho dela iluminado não tem preço."
        }
      ]
    }
  }
}
</script>

<style scoped>
.carro-social1 {
  padding: 40px 16px;
  background: var(--white);
}

.carro-social1__container {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
}

.hashtag {
  font-size: 24px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 24px;
  font-family: 'Product Sans', sans-serif;
}

.rating-card {
  margin-bottom: 24px;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.stars .material-icons {
  color: #FFD700;
  font-size: 25px;
}

.rating-text {
  font-size: 16px;
  color: var(--text-color);
  font-family: 'Product Sans', sans-serif;
  margin: 0;
}

.message {
  margin-bottom: 24px;
}

.message p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.9;
  margin: 0;
  font-family: 'Product Sans', sans-serif;
}

.testimonials {
  width: 100%;
}

.testimonials-swiper {
  padding: 8px 4px;
  margin: -8px -4px;
}

.testimonial-card {
  background: var(--white);
  padding: 16px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  height: 100%;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-info {
  flex: 1;
}

.testimonial-info h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px;
  color: var(--text-color);
  font-family: 'Product Sans', sans-serif;
}

.testimonial-info .stars {
  margin: 0;
}

.testimonial-info .stars .material-icons {
  font-size: 14px;
}

.testimonial-text {
  font-size: 14px;
  line-height: 1.4;
  color: var(--text-color);
  opacity: 0.9;
  font-family: 'Product Sans', sans-serif;
  margin: 0;
}

:deep(.swiper-slide) {
  height: auto;
}

:deep(.swiper) {
  overflow: visible;
}
</style> 