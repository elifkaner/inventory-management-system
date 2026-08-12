using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InventoryManagement.Application.DTOs;
using InventoryManagement.Application.Interfaces;
using InventoryManagement.Application.Interfaces.Repositories;
using InventoryManagement.Domain.Entities;

namespace InventoryManagement.Application.Services
{
    public class PendingOrderService : IPendingOrderService
    {
        private readonly IPendingOrderRepository _pendingOrderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;

        public PendingOrderService(
            IPendingOrderRepository pendingOrderRepository,
            IProductRepository productRepository,
            IUnitOfWork unitOfWork)
        {
            _pendingOrderRepository = pendingOrderRepository;
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<PendingOrderDto>> GetAllPendingOrdersAsync()
        {
            var orders = await _pendingOrderRepository.GetAllWithProductAsync();

            return orders.Select(p => new PendingOrderDto
            {
                Id = p.Id,
                ProductId = p.ProductId,
                ProductName = p.Product?.ProductName,
                SkuCode = p.Product?.SkuCode,
                Barcode = p.Product?.Barcode,
                Category = p.Product?.Category?.Name,
                Brand = p.Product?.Brand?.Name,
                Supplier = p.Product?.Supplier?.CompanyName,
                OrderQuantity = p.OrderQuantity,
                OrderDate = p.OrderDate
            }).ToList();
        }

        public async Task<PendingOrderDto> AddPendingOrderAsync(CreatePendingOrderDto dto)
        {
            var product = await _productRepository.GetByIdAsync(dto.ProductId);
            if (product == null)
                throw new Exception("Product not found.");

            var existingOrder = await _pendingOrderRepository.GetByProductIdAsync(dto.ProductId);

            await _unitOfWork.BeginTransactionAsync();
            try
            {
                if (existingOrder != null)
                {
                    existingOrder.OrderQuantity += dto.OrderQuantity;
                    existingOrder.OrderDate = DateTime.UtcNow;
                    _pendingOrderRepository.Update(existingOrder);
                    await _unitOfWork.CommitAsync();
                    
                    return new PendingOrderDto
                    {
                        Id = existingOrder.Id,
                        ProductId = existingOrder.ProductId,
                        ProductName = product.ProductName,
                        SkuCode = product.SkuCode,
                        Barcode = product.Barcode,
                        Category = product.Category?.Name,
                        Brand = product.Brand?.Name,
                        Supplier = product.Supplier?.CompanyName,
                        OrderQuantity = existingOrder.OrderQuantity,
                        OrderDate = existingOrder.OrderDate
                    };
                }
                else
                {
                    var newOrder = new PendingOrder
                    {
                        ProductId = dto.ProductId,
                        OrderQuantity = dto.OrderQuantity,
                        OrderDate = DateTime.UtcNow
                    };

                    await _pendingOrderRepository.AddAsync(newOrder);
                    await _unitOfWork.CommitAsync();

                    return new PendingOrderDto
                    {
                        Id = newOrder.Id,
                        ProductId = newOrder.ProductId,
                        ProductName = product.ProductName,
                        SkuCode = product.SkuCode,
                        Barcode = product.Barcode,
                        Category = product.Category?.Name,
                        Brand = product.Brand?.Name,
                        Supplier = product.Supplier?.CompanyName,
                        OrderQuantity = newOrder.OrderQuantity,
                        OrderDate = newOrder.OrderDate
                    };
                }
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }

        public async Task DeletePendingOrderAsync(int id)
        {
            var order = await _pendingOrderRepository.GetByIdAsync(id);
            if (order != null)
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    _pendingOrderRepository.Remove(order);
                    await _unitOfWork.CommitAsync();
                }
                catch
                {
                    await _unitOfWork.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task DeletePendingOrdersByProductIdAsync(int productId)
        {
            var orders = await _pendingOrderRepository.GetListByProductIdAsync(productId);
            if (orders.Any())
            {
                await _unitOfWork.BeginTransactionAsync();
                try
                {
                    _pendingOrderRepository.RemoveRange(orders);
                    await _unitOfWork.CommitAsync();
                }
                catch
                {
                    await _unitOfWork.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
