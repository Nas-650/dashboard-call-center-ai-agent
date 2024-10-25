"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ViewModal } from "@/components/ui/view-modal"
import { useProducts } from "@/hooks/use-products"
import { ColumnDef } from "@tanstack/react-table"

interface Product extends Record<string, unknown> {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
]

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Product | null>(null)
  const { data: products, isLoading, error } = useProducts()

  const handleView = (item: Product) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const renderContent = (item: Product | null) => {
    if (!item) return null;
    return (
      <div>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Price:</strong> {item.price}</p>
        <p><strong>Stock:</strong> {item.stock}</p>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button>Add Product</Button>
      </div>
      <DataTable<Product>
        data={products}
        columns={columns}
        onView={handleView}
      />
      <ViewModal<Product>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        renderContent={renderContent}
      />
    </div>
  )
}
