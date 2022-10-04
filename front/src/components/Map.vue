<template>
<div>
    <h1>Vos coordonnées :</h1>
    <p>{{ coordinates.lat}} Latitude, {{coordinates.lng}} Longitude</p>
    <GmapMap
    :center="{lat:10, lng:10}"
    
    :zoom="7"
    style="width:640px; height:360px;"
    ></GmapMap>
</div>
</template>


<script>
    export default {
        data() {
            return {
                coordinates: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        created () {
            // get user's coordinates from browser request
            this.$getLocation({})
            .then (coordinates => {
                this.coordinates = coordinates;

            })
            .catch(error => alert(error));
        }
    }

</script>



<style>

</style>