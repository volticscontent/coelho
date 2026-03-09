<template>
  <div class="home">
    <Header />
    <Hero id="hero" />
    <CarroBenefit id="carro-benefit" />
    <StarProduct1 id="star-product" />
    <CarroSocial1 id="carro-social-1" />
    <MapSell id="map-sell" />
    <CarroSocial2 />
    <WhySell id="why-sell" />
    <WhyUpsell />
    <CarroSocial3 id="carro-social-3" />
    <GarantiasSection id="garantias" />
    <SecSocial />
    <SpecialistSocial />
    <DonationSocial id="donation-social" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import CarroBenefit from '@/components/CarroBenefit.vue'
import StarProduct1 from '@/components/StarProduct1.vue'
import CarroSocial1 from '@/components/CarroSocial1.vue'
import MapSell from '@/components/MapSell.vue'
import CarroSocial2 from '@/components/CarroSocial2.vue'
import WhySell from '@/components/WhySell.vue'
import WhyUpsell from '@/components/WhyUpsell.vue'
import CarroSocial3 from '@/components/CarroSocial3.vue'
import GarantiasSection from '@/components/Garantias.vue'
import SecSocial from '@/components/SecSocial.vue'
import SpecialistSocial from '@/components/SpecialistSocial.vue'
import DonationSocial from '@/components/DonationSocial.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Header,
    Hero,
    CarroBenefit,
    StarProduct1,
    CarroSocial1,
    MapSell,
    CarroSocial2,
    WhySell,
    WhyUpsell,
    CarroSocial3,
    GarantiasSection,
    SecSocial,
    SpecialistSocial,
    DonationSocial,
    Footer
  }
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
