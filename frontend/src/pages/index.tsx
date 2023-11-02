import Head from "next/head";
import Image from "next/image";

import { Input } from "../components/Input";

import logoImg from "../../public/Logo.svg";

import styles from "../../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito Pizzaria" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />
          </form>
        </div>
      </div>
    </>
  );
}
