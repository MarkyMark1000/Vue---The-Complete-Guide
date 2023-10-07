<template>
    <ul>
        <li v-for="resource in storedResources" :key="resource.id">
            <h2>
                <a :href="resource.link">
                    {{ resource.id + ' ' + resource.title }}
                </a>
            </h2>
            <h4>{{ resource.description }}</h4>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            storedResources: [
                {
                    id: 'official-guide',
                    title: 'Official Guide',
                    description: 'The official vue.js documentation',
                    link: 'https://vuejs.org'
                },
                {
                    id: 'google',
                    title: 'Google',
                    description: 'Learn to google',
                    link: 'https://google.org'
                },
            ],
        };
    },
}
</script>
