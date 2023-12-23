import axios from "axios";
import { JSX, createContext, createSignal, useContext } from "solid-js";
import { apiClient } from "../services/api";
import { Sweet } from "../types/Sweet";

const sweetContext = createContext();

export const SweetProvider = (
  props: JSX.IntrinsicAttributes & { value: unknown } & {
    children: JSX.Element;
  }
) => {
  /*     Route::prefix('sweets')->group(function () {
        Route::get('/', [SweetController::class, 'index']);
        Route::post('/', [SweetController::class, 'store']);
        Route::get('/{sweet}', [SweetController::class, 'show']);
        Route::put('/{sweet}', [SweetController::class, 'update']);
        Route::delete('/{sweet}', [SweetController::class, 'destroy']);

        Route::get('/like', [sweetInteractionsController::class, 'like']);
        Route::get('/unlike', [ReplyController::class, 'unlike']);
        Route::get('/bookmark', [ReplyController::class, 'bookmark']);
        Route::get('unbookmark', [ReplyController::class, 'unBookMark']);
    }); */

  /*    Schema::create('sweets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->text('content');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        }); */

  const [sweets, setSweets] = createSignal([]);
  const [sweet, setSweet] = createSignal(null);

  const create = async (data: Sweet) => {
    const response = await apiClient.post("/api/sweets", data);
  };

  const get = async (id: number | string) => {
    const response = await apiClient.get(`/api/sweets/${id}`);
    setSweet(response.data);
  };

  const getAll = async () => {
    const response = await apiClient.get("/api/sweets");
    setSweets(response.data);
  };

  const update = async (id: number | string, data: Sweet) => {
    const response = await apiClient.put(`/api/sweets/${id}`, data);
    setSweets(
      sweets.map((sweet: { id: string | number }) =>
        sweet.id === id ? response.data : sweet
      )
    );
  };

  const remove = async (id: number | string) => {
    await apiClient.delete(`/api/sweets/${id}`);
    setSweets(
      sweets.filter((sweet: { id: string | number }) => sweet.id !== id)
    );
  };

  const like = async (id: number | string) => {
    const response = await apiClient.get(`/api/sweets/like/${id}`);
    setSweets(
      sweets.map((sweet: { id: string | number }) =>
        sweet.id === id ? response.data : sweet
      )
    );
  };

  const unlike = async (id: number | string) => {
    const response = await apiClient.get(`/api/sweets/unlike/${id}`);
    setSweets(
      sweets.map((sweet: { id: string | number }) =>
        sweet.id === id ? response.data : sweet
      )
    );
  };

  const bookmark = async (id: number | string) => {
    const response = await apiClient.get(`/api/sweets/bookmark/${id}`);
    setSweets(
      sweets.map((sweet: { id: string | number }) =>
        sweet.id === id ? response.data : sweet
      )
    );
  };

  const unbookmark = async (id: number | string) => {
    const response = await apiClient.get(`/api/sweets/unbookmark/${id}`);
    setSweets(
      sweets.map((sweet: { id: string | number }) =>
        sweet.id === id ? response.data : sweet
      )
    );
  };

  const value = {
    sweet,
    sweets,
    create,
    get,
    getAll,
    update,
    remove,
    like,
    unlike,
    bookmark,
    unbookmark,
  };
  return (
    <sweetContext.Provider value={value}>
      {props.children}
    </sweetContext.Provider>
  );
};

export const useSweet = () => {
  return useContext(sweetContext);
};
