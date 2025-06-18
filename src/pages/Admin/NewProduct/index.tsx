import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ModalNewImage from '../../../components/ModalNewImage';
import SelectCategories from '../../../components/SelectCategories';
import {
  useCreateProduct,
  useGetProductById,
} from '../../../hooks/useProducts';
import { updateProduct } from '../../../hooks/useProducts/api';

export default function NewProduct() {
  const [initialValues, setInitialValues] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: [],
  });
  const { mutateAsync: postProduct } = useCreateProduct();
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProductById(id);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isAddMode, setIsAddMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsAddMode(false);
      setInitialValues({
        title: product?.title || '',
        price: product?.price.toString() || '',
        description: product?.description || '',
        categoryId: product?.category.id || '',
        images: product?.images || [],
      });

      setImages(product?.images || []);
    }
  }, [id, product]);

  const validateSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    description: Yup.string().required('Description is required'),
    categoryId: Yup.string().required('Category is required'),
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap justify-center p-4">
      <div className="flex w-full items-center justify-between py-4">
        <span className="text-lg font-bold text-gray-700">
          {isAddMode ? 'Add Product' : 'Edit Product'}
        </span>
      </div>
      <div className="flex w-full items-center justify-start gap-2 py-4">
        <Formik
          enableReinitialize={true}
          validationSchema={validateSchema}
          initialValues={initialValues}
          onSubmit={async (values, { setErrors }) => {
            if (images.length === 0) {
              setErrors({ images: 'At least one image is required' });
              return;
            }

            try {
              if (isAddMode) {
                await postProduct({
                  title: values.title,
                  price: Number(values.price),
                  description: values.description,
                  categoryId: values.categoryId,
                  images: images,
                });
              } else {
                await updateProduct({
                  id: id || '',
                  title: values.title,
                  price: Number(values.price),
                });
              }
            } catch (error) {
              console.error('Error creating product:', error);
              setErrors({ title: 'Failed to create product' });
            } finally {
              setImages([]);
              alert('Saved successfully!');
              navigate('/admin/list-products');
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} action="" className="w-full">
              <div className="m-auto grid grid-cols-2 gap-4">
                <div>
                  <label className="block py-2 text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                  />
                  {errors.title && touched.title && (
                    <span className="text-sm text-red-500">{errors.title}</span>
                  )}
                </div>
                <div>
                  <label className="block py-2 text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                  />
                  {errors.price && touched.price && (
                    <span className="text-sm text-red-500">{errors.price}</span>
                  )}
                </div>
                <div>
                  <label className="block py-2 text-gray-700">Category</label>
                  <SelectCategories
                    isRegister
                    className="w-full rounded border p-2 text-gray-400"
                    setCategoryFilter={category => {
                      if (category) {
                        setFieldValue('categoryId', category.id.toString());
                      }
                    }}
                  />
                  {errors.categoryId && touched.categoryId && (
                    <span className="text-sm text-red-500">
                      {errors.categoryId}
                    </span>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block py-2 text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="w-full rounded border p-2"
                    rows={8}
                  />
                  {errors.description && touched.description && (
                    <span className="text-sm text-red-500">
                      {errors.description}
                    </span>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block py-2 text-gray-700">Images</label>
                  <div className="flex flex-row items-center border p-4">
                    {images.length > 0 &&
                      images.map((image, index) => (
                        <div
                          key={index}
                          className="relative mr-2 h-24 w-24 cursor-pointer"
                        >
                          {/* Importante: Aqui não renderizou a imagem mas o upload foi bem sucedido, a não renderização se deu por conta da configuração
                          de CORS, o frontend está rodando em um servidor diferente do backend. */}
                          <img src={image} className="h-full w-full" />
                          <button
                            type="button"
                            className="absolute right-0 top-0 m-1 rounded-full bg-red-500 p-1 text-white"
                            onClick={() =>
                              setImages(images.filter((_, i) => i !== index))
                            }
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      ))}
                    <div
                      className="flex h-24 w-24 cursor-pointer items-center justify-center border"
                      onClick={() => setShowModal(true)}
                    >
                      <FaPlus size={24} className="m-auto text-gray-400" />
                    </div>
                  </div>
                  {errors.images && (
                    <span className="text-sm text-red-500">
                      {errors.images}
                    </span>
                  )}
                </div>
                <div className="col-span-2 mt-4 flex w-full justify-end gap-2">
                  {!isAddMode && (
                    <button
                      onClick={e => {
                        e.preventDefault();
                        navigate('/admin/list-products');
                      }}
                      className="w-36 rounded bg-red-500 p-2 text-xs uppercase text-white hover:bg-red-400"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    className="w-36 rounded bg-green-500 p-2 text-xs uppercase text-white hover:bg-green-400"
                  >
                    {isAddMode ? 'Add Product' : 'Update Product'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>

        {showModal && (
          <ModalNewImage setShowModal={setShowModal} setImages={setImages} />
        )}
      </div>
    </div>
  );
}
