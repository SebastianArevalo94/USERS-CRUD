using System;
using System.Collections.Generic;
using CRUD_SEBASTIAN.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CRUD_SEBASTIAN.Context
{
    public partial class CRUDContext : DbContext
    {
        public CRUDContext()
        {
        }

        public CRUDContext(DbContextOptions<CRUDContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__usuarios__B9BE370F07F6335A");

                entity.ToTable("usuarios");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Email)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
