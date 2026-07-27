FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /src

COPY backend.csproj ./
RUN dotnet restore

COPY . ./

RUN dotnet publish \
    backend.csproj \
    --configuration Release \
    --output /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish ./

ENV ASPNETCORE_URLS=http://0.0.0.0:10000
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 10000

ENTRYPOINT ["dotnet", "backend.dll"]