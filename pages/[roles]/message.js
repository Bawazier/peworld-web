/* eslint-disable no-constant-condition */
import React, {useState, useEffect, useRef} from "react";
import Layout from "../../components/layout";
import BubbleMessage from "../../components/common/bubble-message";
import MutateError from "../../components/handle/mutateError";
import { FaPaperPlane } from "react-icons/fa";
import { getAllList, getPrivateMessage, sendChat } from "../../libs/api";
import {
  QueryClient,
  useQuery,
  useQueryClient,
  useMutation,
} from "react-query";
import { dehydrate } from "react-query/hydration";
import { useCookies } from "react-cookie";
import { parseCookies } from "../../helpers/parseCookies";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, params }) {
  const cookies = await parseCookies(req);
  const queryClient = new QueryClient();
  if (Object.keys(cookies).length === 0 && cookies.constructor === Object) {
    return {
      redirect: {
        destination: `/${params.roles}/auth/login`,
        permanent: false,
      },
    };
  }
  await queryClient.prefetchQuery(
    [`${params.roles}-message-list-person`],
    () => getAllList(cookies.token)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Message() {
  const { NEXT_PUBLIC_API_URL_IMAGE } = process.env;
  const [recipient, setRecipient] = useState({});
  const [pageChat, setPageChat] = useState(1);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { roles } = router.query;
  const [cookies] = useCookies(["user"]);
  

  const { data, isSuccess } = useQuery(
    [`${roles}-message-list-person`],
    () => getAllList(cookies.token),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  const {
    data: dataPrivateChat,
    isSuccess: isSuccessShowPrivateChat,
  } = useQuery(
    [`${roles}-message-private-person`, recipient.id, pageChat],
    () => getPrivateMessage(cookies.token, recipient.id, pageChat),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 2,
      cacheTime: 1000 * 60,
      enabled: recipient != undefined,
    }
  );

  const {
    mutate: sendMessage,
    isError: isSendMessageError,
    reset: resetSendMessage,
  } = useMutation((message) => sendChat(cookies.token, recipient.id, message), {
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([`${roles}-message-private-person`]);
    },
  });

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };
  const onMessage = async () => {
    await sendMessage(message);
    setMessage("");
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipient]);

  return (
    <Layout>
      <section className="z-50 grid grid-cols-3 gap-8">
        <section className="bg-white flex flex-col space-y-6 rounded-2xl py-4 shadow-2xl my-20 min-h-screen">
          <section className="flex flex-col space-y-2">
            <h1 className="px-8 align-middle font-semibold text-2xl h-12">
              Chat
            </h1>
            <hr />
          </section>
          <section className="px-8 grid grid-cols-1 gap-2">
            {isSuccess && data.results.length ? (
              data.results.map((item) => {
                if (item.sender === parseInt(cookies.userId)) {
                  return (
                    <div
                      className="grid grid-cols-5 gap-2"
                      onClick={() => setRecipient(item.RecipientDetails)}
                    >
                      <img
                        src={
                          item.RecipientDetails.photo
                            ? NEXT_PUBLIC_API_URL_IMAGE +
                              item.RecipientDetails.photo
                            : "../images/person.png"
                        }
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="col-span-4">
                        <h1 className="font-semibold text-xl">
                          {item.RecipientDetails.name}
                        </h1>
                        <p className="text-gray-400">
                          {item.message.length < 10
                            ? item.message
                            : item.message.substring(0, 20).concat("...")}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="grid grid-cols-5 gap-2"
                      onClick={() => setRecipient(item.SenderDetails)}
                    >
                      <img
                        src={
                          item.SenderDetails.photo
                            ? NEXT_PUBLIC_API_URL_IMAGE +
                              item.SenderDetails.photo
                            : "../images/person.png"
                        }
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="col-span-4">
                        <h1 className="font-semibold text-xl">
                          {item.SenderDetails.name}
                        </h1>
                        <p className="text-gray-400">
                          {item.message.length < 10
                            ? item.message
                            : item.message.substring(0, 20).concat("...")}
                        </p>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <div className="flex flex-col space-y-2 items-center justify-center">
                <img
                  src="../images/chat-ilustration.png"
                  className="w-28 h-28"
                />
                <h1>Belum ada chat</h1>
              </div>
            )}
          </section>
        </section>
        {isSendMessageError ? (
          <section className="bg-white col-span-2 flex flex-col rounded-2xl py-4 px-8 shadow-2xl my-20">
            <MutateError
              heightContainer="screen"
              resetError={() => resetSendMessage()}
            />
          </section>
        ) : (
          <section className="bg-white col-span-2 flex flex-col space-y-4 rounded-2xl py-4 shadow-2xl my-20">
            <section className="flex flex-col space-y-2">
              {recipient != undefined ? (
                <div className="flex items-center space-x-2 px-8">
                  <img
                    src={recipient.photo}
                    className="w-12 h-12 rounded-full"
                  />
                  <h1 className="font-semibold text-xl">{recipient.name}</h1>
                </div>
              ) : (
                <h1 className="px-8 font-semibold text-xl">&nbsp;</h1>
              )}
              <hr />
            </section>
            <section className="px-8 w-full h-full max-h-screen min-h-screen flex flex-col space-y-6 justify-end">
              {isSuccessShowPrivateChat ? (
                <div className="flex flex-col overflow-y-auto space-y-2">
                  <div className="flex flex-col items-end space-y-2">
                    {dataPrivateChat.results
                      .map((item, index) => (
                        <BubbleMessage
                          ref={item.length - 1 == index ? messagesEndRef : null}
                          recipient={item.sender === parseInt(cookies.userId)}
                          message={item.message}
                          key={item.id}
                        />
                      ))
                      .reverse()}
                    <div
                      ref={messagesEndRef}
                      className="float-left clear-both"
                    ></div>
                  </div>
                </div>
              ) : null}
              {recipient != undefined ? (
                <div className="grid grid-cols-8 gap-6">
                  <input
                    placeholder="type message..."
                    className="py-2 px-4 border-2 rounded-full col-span-7"
                    value={message}
                    onChange={onChangeMessage}
                  />
                  <div
                    onClick={onMessage}
                    className="bg-current-purple flex items-center justify-center rounded-full text-white text-2xl"
                  >
                    <FaPaperPlane />
                  </div>
                </div>
              ) : null}
            </section>
          </section>
        )}
      </section>
    </Layout>
  );
}

export default Message;
