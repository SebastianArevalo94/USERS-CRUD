using Microsoft.EntityFrameworkCore;
using CRUD_SEBASTIAN.Models;
using CRUD_SEBASTIAN.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CRUDContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("ConexionSQL")));

var corsRules = "corsRules";

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: corsRules, builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsRules);

app.UseAuthorization();

app.MapControllers();

app.Run();
