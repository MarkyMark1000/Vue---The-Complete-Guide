<template>
    <ul>
        <li v-for="goal in goals" :key="goal">
            <!-- here we bind item to the vaulue goal -->
            <slot :item="goal" another-prop="......"></slot>
        </li>
    </ul>
</template>

<script>

export default {
    data() {
        return {
            goals: ['Finish the course', 'Learn Vue']
        };
    }
}
</script>
