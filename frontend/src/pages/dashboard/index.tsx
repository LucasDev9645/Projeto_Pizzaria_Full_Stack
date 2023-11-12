import { canSSRAuth } from "@/src/utils/canSSRAuth";
import Head from "next/head";

import { Header } from "@/src/components/Header";
import { setupApiClient } from "@/src/services/api";

import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { useState } from "react";

type OrdeProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: OrdeProps[];
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);

  function handleOpenModalView(id: string) {
    alert("teste" + id);
  }

  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <Header />
      <div>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Útimos Pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
          <article className={styles.listOrders}>
            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiCliente = setupApiClient(ctx);

  const response = await apiCliente.get("/orders");

  return {
    props: {
      orders: response.data,
    },
  };
});
