import Head from "next/head";

import { Header } from "@/src/components/Header";
import { canSSRAuth } from "@/src/utils/canSSRAuth";

import styles from "./styles.module.scss";

export default function Product() {
  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Produto</h1>
          <form className={styles.form}>
            <select>
              <option>Bebidas</option>
              <option>Pizzas</option>
            </select>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Digite o preço do produto"
              className={styles.input}
            />
            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
            />
            <button type="submit" className={styles.buttonCadastrar}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
