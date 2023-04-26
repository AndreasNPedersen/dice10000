using dice10000;
using dice10000.Interfaces;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseKestrel().UseUrls("http://0.0.0.0:5091");
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(x => x.AddPolicy("allowall",
    x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));

builder.Services.AddScoped<IDiceApplication, DiceApplication>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("allowall");
app.MapControllers();

app.Run();
