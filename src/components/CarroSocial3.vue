<template>
  <section class="carro-social3">
    <div class="carro-social3__container">
      <h2 class="hashtag">#MomentoMágico</h2>
      
      <div class="rating-card">
        <div class="stars">
          <span class="material-icons" v-for="i in 5" :key="i">star</span>
        </div>
        <p class="rating-text">Mais de 50.000 crianças felizes</p>
      </div>

      <div class="message">
        <p>Veja o que os pais estão falando sobre o vídeo do Coelho da Páscoa. Cada mensagem é única e especial, criada com muito carinho para <br> fazer seu pequeno sorrir!</p>
      </div>

      <!-- Carrossel de Comentários -->
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

      <!-- Botão CTA -->
      <div class="cta-container">
        <router-link 
          to="/personalizar/quantidade"
          class="btn btn-primary btn-cta"
          @click="handleCreateVideo"
        >
          CRIAR VIDEO
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { trackComponentEvent } from '@/utils/analytics'

export default {
  name: 'CarroSocial3',
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
          text: "A melhor surpresa que já fiz para minha filha! Ela adorou ver o Coelho da Páscoa falando com ela."
        },
        {
          name: "@Luiza_Pereira",
          avatar: require("@/assets/imgs/avatar17.jpg"),
          text: "O vídeo trouxe tanta magia! Meu pequeno não para de assistir."
        },
        {
          name: "@Maria_Santos",
          avatar: require("@/assets/imgs/avatar18.jpg"),
          text: "Incrível como o vídeo tornou nosso momento mais especial! Recomendo muito."
        },
        {
          name: "@Ana_Clara",
          avatar: require("@/assets/imgs/avatar19.jpg"),
          text: "A melhor experiência que já tivemos! O vídeo é lindo e emocionante."
        },
        {
          name: "@Fernanda_Lima",
          avatar: require("@/assets/imgs/avatar20.jpg"),
          text: "Um presente único e especial. Vale muito a pena!"
        },
        {
          name: "@Patricia_Costa",
          avatar: require("@/assets/imgs/avatar21.jpg"),
          text: "Minha filha não para de assistir! Foi o presente mais especial."
        }
      ]
    }
  },
  methods: {
    handleCreateVideo() {
      trackComponentEvent.carroSocial3.createVideo()
    }
  }
}
</script>

<style scoped>
.carro-social3 {
  padding: 40px 16px;
  background: linear-gradient(180deg, #ffffff 0%, #89f1ff96 100%);
}

.carro-social3__container {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hashtag {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  font-family: "Fertigo Pro", Times, "Times New Roman", serif;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic; 
}

.rating-card {
  background: var(--white);
  padding: 16px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.stars {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 8px;
}

.stars .material-icons {
  color: #FFD700;
  font-size: 24px;
}

.rating-text {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
  font-family: 'Product Sans', sans-serif;
}

.message {
  font-size: 16px;
  line-height: 1.2;
  color: #000000;
  font-weight: 550;
  font-family: 'Product Sans', sans-serif;
  opacity: 1;
  padding: 0 4px;
}

.message p {
  margin: 0;
}

.testimonials {
  margin-top: 24px;
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

.cta-container {
  margin-top: 32px;
  padding: 0 16px;
}

.btn-cta {
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  font-size: 18px;
  padding: 14px 32px;
}
</style> 