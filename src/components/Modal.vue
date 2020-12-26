<template>
    <section @click="closeModal" class="z-10 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-50"></section>
    <div class="absolute inset-0">
        <div class="flex h-full">
            <div class="z-20 m-auto bg-white p-2 rounded shadow">
                <div class="p-2 border flex flex-col items-center">
                    <h1 class="text-2xl">
                        <slot name="title">Fallback content: this will be rendered only when no content is provided</slot>
                    </h1>
                    <main>
                        <slot name="body"></slot>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(_, {emit}) { // first arg for props is not used so _ is placed
        const closeModal = () => {
            emit('close-modal')
        }
        return {closeModal}
    }
}
</script>

<style>

</style>