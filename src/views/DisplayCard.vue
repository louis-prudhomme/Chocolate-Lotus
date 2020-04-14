<template>
<div>
    <v-card max-width="600">
        <v-row>
        <v-col xs4 sm3 md2 lg1 align-content-center align-center>
            <img :src="card.imageUrl"/>
        </v-col>
        <v-col cols="col-3">
            <v-simple-table>
            <template v-slot:default>
            <tbody>
                <tr>
                    <td>Title </td>
                    <td>{{ card.name }}</td>
                </tr>
                <tr>
                    <td>Color </td>
                    <td>{{ card.colors }}</td>
                </tr>
                <tr>
                    <td>Type </td>
                    <td>{{ card.type }}</td>
                </tr>
                <tr>
                    <td>Mana cost </td>
                    <td>{{ card.manaCost }}</td>
                </tr>
            </tbody>
            </template>
            </v-simple-table>
        </v-col>
        </v-row>
    </v-card>
    <h1>Description: </h1>
    <p>{{card.text}}</p>
    <h1>Rules: </h1>
    <p>{{card.rulings}}</p>
</div>
</template>

<script>

export default {
  name: 'DisplayCard',
  props: {
    card: Object
  }
}
</script>
