from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from pydantic import BaseModel
import networkx as nx


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for the response
class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineParseResponse)
def parse_pipeline(pipeline: str = Form(...)) -> PipelineParseResponse:
    try:
        num_nodes, num_edges = map(int, pipeline.split(','))

        # For demonstration, assuming the pipeline is a list of edges
        edges = [tuple(map(int, edge.split(','))) for edge in pipeline.split(';') if edge]
        
        # Create a directed graph
        G = nx.DiGraph(edges)
        # Check if the graph is a DAG
        is_dag = nx.is_directed_acyclic_graph(G)

        
        # Return the parsed response as a Pydantic model
        return PipelineParseResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag
        )
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Invalid input: {ve}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")