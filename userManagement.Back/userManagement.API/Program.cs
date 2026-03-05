var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.AllowAnyOrigin() // En producción aquí pondrías http://localhost:4200
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthorization();

app.MapControllers();

app.Run();
