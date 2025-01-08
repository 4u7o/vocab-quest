<template>
    <div>
        <h1>{{ message }}</h1>
        <button @click="increment">Clicked {{  count }} times</button>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const count = ref(1);
        const message = 'Hello from Vue!';

        const increment = () => {
            count.value++;
        };

        return { count, message, increment }
    },
};
</script>

<style>
h1 {
    color: #42b983;
}
</style>