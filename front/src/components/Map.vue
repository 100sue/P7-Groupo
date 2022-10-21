<template>
<div>
    <div style="display: flex; align-items: center; justify-content: space-between">
        <div>
            <h1>Vos coordonnées :</h1>
            <p>{{ myCoordinates.lat}} Latitude, {{myCoordinates.lng}} Longitude</p>
        </div>
        <div>
            <h1>Coordonnées de la Map :</h1>
            <p>{{ mapCoordinates.lat}} Latitude, {{mapCoordinates.lng}} Longitude</p>
        </div>
    
    </div>
    
    <GoogleMap
    api-key=""
    :center="myCoordinates"
    :zoom="zoom"
    style="width:640px; height:360px; margin: 32px auto;"
    ref="mapRef"
    @dragend="handleDrag"
    ></GoogleMap>
</div>
</template>


<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat:0 , lng: 0 };

    return { center };
  },
        data() {
            return {
                map: null,
                myCoordinates: {
                    lat: 0,
                    lng: 0
                },
                zoom: 7  
            }
        },
        created () {
            if(localStorage.center) {
                this.myCoordinates = JSON.parse(localStorage.center);
            } else {
                 // get user's coordinates from browser request
            this.$getLocation({})
            .then (coordinates => {
                this.myCoordinates = coordinates;

            })
            .catch(error => alert(error));

            }
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom);
            }
            
        },
       
        methods: {
            handleDrag() {
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();

                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }

        },
        computed: {
            mapCoordinates() {
                if(!this.map) {
                    return {
                    lat: 0,
                    lng: 0
                };
                }
                return {
                    lat: this.map.getCenter().lat().toFixed(4),
                    lng: this.map.getCenter().lng().toFixed(4)
                }
            }
        }
})

</script>



<style>

</style>