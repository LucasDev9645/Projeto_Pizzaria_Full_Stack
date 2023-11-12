import { useState } from "react";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import Head from "next/head";
import Modal from "react-modal";

import { Header } from "@/src/components/Header";
import { setupApiClient } from "@/src/services/api";
import { ModalOrder } from "@/src/components/ModalOrder";

import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";

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

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupApiClient();

    const response = await apiClient.get("/order/detail", {
      params: {
        order_id: id,
      },
    });
    setModalItem(response.data);
    setModalVisible(true);
  }

  Modal.setAppElement("#__next");

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
        {modalVisible && <ModalOrder />}
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
