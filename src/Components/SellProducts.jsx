import React, { useEffect, useState } from "react";
import { getData, postData } from "../Fetch/Axios";
import URLS from "../Fetch/urls";
import { Button } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import printJS from "print-js";

const SellProducts = () => {
  const [products, setProducts] = useState();
  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    const getProds = async () => {
      const prodcuts = await getData(URLS.products);
      setProducts(() => prodcuts.docs);
    };

    getProds();
  }, []);

  const handleAddProducts = (prod, add) => {
    let count = selectedProducts[prod._id]?.count;
    console.log("count", count);

    if (count > 0 && add) {
      count = count + 1;
      setSelectedProducts((prev) => {
        return { ...prev, [prod._id]: { ...prod, count } };
      });
    } else if (add) {
      setSelectedProducts((prev) => {
        return { ...prev, [prod._id]: { ...prod, count: 1 } };
      });
    } else if (count > 0 && !add) {
      setSelectedProducts((prev) => {
        count = count - 1;
        if (count === 0) {
          delete prev[prod._id];
          return { ...prev };
        }
        return { ...prev, [prod._id]: { ...prod, count } };
      });
    } else if (count === 0 && !add) {
      setSelectedProducts((prev) => {
        delete prev[prod._id];
        return { ...prev, [prod._id]: { ...prod, count: count - 1 } };
      });
    }
  };

  useEffect(() => {
    if (selectedProducts) {
      console.log(selectedProducts);
    }
  }, [selectedProducts]);

  const [pdf, setPdf] = useState();

  const handlePrintPdf = async (receipt) => {
    if (receipt) {
      printJS({ printable: URLS.receipt_url, type: "pdf", showModal: true });
    }
  };

  const handlePrint = async () => {
    const details = await postData(selectedProducts, URLS.receipt);
    handlePrintPdf(details.receipt);

    setPdf();
  };

  return (
    <div>
      <div className="text-black font-semibold text-lg px-4 mt-2">Products</div>

      <div className="p-3 grid grid-cols-7 gap-3">
        {products &&
          products.map((el, index) => {
            return (
              <div
                key={el.name}
                className="flex flex-col justify-center items-center p-3 border w-full"
              >
                <div className="flex w-full justify-center items-center text-xl">
                  <div className=" p-3 ">{el.name}</div>
                  <div>{el.sellingRate}₹</div>
                </div>{" "}
                <div className="flex gap-3">
                  <Button
                    className="bg-red-300"
                    onClick={() => {
                      handleAddProducts(el);
                    }}
                  >
                    <MinusOutlined></MinusOutlined>
                  </Button>
                  <Button
                    className="bg-green-300"
                    onClick={() => {
                      handleAddProducts(el, true);
                    }}
                  >
                    <PlusOutlined></PlusOutlined>
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      <div className="border m-3 p-3">
        <div className="flex mb-3 w-full justify-end gap-3 items-center">
          <div>
            <span className="text-black font-semibold">Cart Total: </span>
            <span className="text-yellow-700 font-semibold pl-2">
              {Object.keys(selectedProducts).reduce(
                (acc, key) =>
                  acc +
                  selectedProducts[key].count *
                    selectedProducts[key].sellingRate,
                0
              )}
            </span>
          </div>

          <Button
            size="small"
            disabled={Object.keys(selectedProducts).length === 0}
            className="bg-green-400 font-semibold"
            onClick={() => handlePrint()}
          >
            Print Receipt
          </Button>
        </div>
        <div className="border rounded grid grid-cols-7 gap-3">
          {selectedProducts &&
            Object.keys(selectedProducts).map((el, index) => {
              el = selectedProducts[el];
              return (
                <div
                  key={el.name + el.count}
                  className="flex flex-col justify-center items-center gap-1 p-3 border w-full"
                >
                  <div className="flex w-full justify-center items-center text-xl">
                    <div className=" ">{el.name} </div>
                    <div className="ml-2">{el.sellingRate}₹</div>
                  </div>

                  <div className="flex w-full justify-center items-center text-xl">
                    <div className="flex gap-2 border p-1 rounded border-black justify-center items-center flex-row-reverse">
                      <Button
                        size="small"
                        className="bg-green-300"
                        onClick={() => {
                          handleAddProducts(el, true);
                        }}
                      >
                        <PlusOutlined></PlusOutlined>
                      </Button>

                      <div>{el.count}</div>

                      <Button
                        size="small"
                        className="bg-red-300"
                        onClick={() => {
                          handleAddProducts(el);
                        }}
                      >
                        <MinusOutlined></MinusOutlined>
                      </Button>
                    </div>
                  </div>
                  <div className="font-semibold">
                    Total: {el.sellingRate * el.count}
                  </div>

                  <Button
                    size="small"
                    className="bg-orange-300"
                    onClick={() => {
                      setSelectedProducts((prev) => {
                        delete prev[el._id];
                        return {
                          ...prev,
                        };
                      });
                    }}
                  >
                    <DeleteOutlined></DeleteOutlined>
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SellProducts;
