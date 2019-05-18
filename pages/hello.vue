<template>
  <div>
    <h1>Hello World!</h1>
    <p>{{ message |filter }}</p>
    <p>{{ title | format}}</p>

    <p>
      <button @click="reverseMessage">reverseMessage</button>
    </p>

    <h2>mammoth</h2>
    <p>{{ replacedMammoth }}</p>

    <card v-if="person" :person="person" :title="person.first_name"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import Card from "../components/Card.vue";
import { Person } from "~/types";
// import '~/plugins/filter.js' //自定义的全局过滤器引入

@Component({
  components: {
    Card
  },
  //filter
  filters:{
    format:function(val:string):string {
      return val+'　filtered'
    }
  }
})
export default class Hello extends Vue {
  // data
  private message: string = "こんにちは、世界！";
  private person: any = null;

  // methods
  private reverseMessage() {
    this.message = this.message
      .split("")
      .reverse()
      .join("");
  }
  // computed
  private get replacedMammoth() {
    return this.message.includes("こんにちは")
      ? this.message.replace(/こんにちは/, "マンモス")
      : this.message.replace(/はちにんこ/, "スモンマ");
  }
  // lifecycle: mounted
  private async mounted() {
    const people = await this.$axios.$get("./random-data.json");
    const randomPerson = people[Math.floor(Math.random() * people.length)];
    this.person = randomPerson;
    this.message = `こんにちは、${
      randomPerson.first_name
    } さん。いつもありがとうございます！`;
  }
  // lifecycle: created
  private created() {
    this.message = "never give up";
  }
  // props
  @Prop({ default: "default propsTitle" }) title!: string;
  // watch
  @Watch("message")
  onMessageChanged(val: string, oldVal: string) {
    alert("Message changed");
  }
  @Watch("person", { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) {
    console.log("person is changed to " + (val&&val.first_name));
  }
  
}
</script>

